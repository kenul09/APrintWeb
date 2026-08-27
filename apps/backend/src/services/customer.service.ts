import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { paginationMeta, type PaginationParams } from "../utils/pagination";

export async function listCustomers(params: PaginationParams) {
  const where = params.search
    ? {
        OR: [
          { name: { contains: params.search, mode: "insensitive" as const } },
          { email: { contains: params.search, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: params.skip,
      take: params.limit,
      include: { orders: { select: { id: true, amount: true, createdAt: true }, orderBy: { createdAt: "desc" } } },
    }),
    prisma.customer.count({ where }),
  ]);

  const data = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    createdAt: c.createdAt,
    ordersCount: c.orders.length,
    lastOrderAt: c.orders[0]?.createdAt ?? null,
  }));

  return { data, meta: paginationMeta(total, params) };
}

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: { orders: { orderBy: { createdAt: "desc" } } },
  });
  if (!customer) throw ApiError.notFound("Customer not found");
  return customer;
}
