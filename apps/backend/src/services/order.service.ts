import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { paginationMeta, type PaginationParams } from "../utils/pagination";
import type { CreateOrderInput, UpdateOrderInput } from "../validators/order.schema";

const include = { customer: true } as const;

async function findOrCreateCustomer(name: string, email: string, phone?: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.customer.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    // Keep the customer record's contact details current with the latest order.
    return prisma.customer.update({
      where: { id: existing.id },
      data: { name: name.trim(), phone: phone?.trim() || existing.phone },
    });
  }
  return prisma.customer.create({
    data: { name: name.trim(), email: normalizedEmail, phone: phone?.trim() },
  });
}

export async function listOrders(params: PaginationParams & { status?: string; sort?: "asc" | "desc" }) {
  const where = params.search
    ? {
        OR: [
          { customer: { name: { contains: params.search, mode: "insensitive" as const } } },
          { customer: { email: { contains: params.search, mode: "insensitive" as const } } },
          { service: { contains: params.search, mode: "insensitive" as const } },
        ],
        ...(params.status ? { status: params.status as never } : {}),
      }
    : params.status
      ? { status: params.status as never }
      : undefined;

  const [data, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include,
      orderBy: { createdAt: params.sort === "asc" ? "asc" : "desc" },
      skip: params.skip,
      take: params.limit,
    }),
    prisma.order.count({ where }),
  ]);

  return { data, meta: paginationMeta(total, params) };
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({ where: { id }, include });
  if (!order) throw ApiError.notFound("Order not found");
  return order;
}

export async function createOrder(input: CreateOrderInput) {
  const customer = await findOrCreateCustomer(input.customerName, input.customerEmail, input.customerPhone);
  return prisma.order.create({
    data: {
      customerId: customer.id,
      service: input.service,
      message: input.message,
      amount: input.amount,
      status: input.status ?? "NEW",
    },
    include,
  });
}

export async function updateOrder(id: string, input: UpdateOrderInput) {
  const order = await getOrderById(id);

  let customerId = order.customerId;
  if (input.customerName || input.customerEmail || input.customerPhone) {
    const customer = await findOrCreateCustomer(
      input.customerName ?? order.customer.name,
      input.customerEmail ?? order.customer.email,
      input.customerPhone ?? order.customer.phone ?? undefined
    );
    customerId = customer.id;
  }

  return prisma.order.update({
    where: { id },
    data: {
      customerId,
      service: input.service,
      message: input.message,
      amount: input.amount,
      status: input.status,
    },
    include,
  });
}

export async function updateOrderStatus(id: string, status: string) {
  await getOrderById(id);
  return prisma.order.update({ where: { id }, data: { status: status as never }, include });
}

export async function deleteOrder(id: string) {
  await getOrderById(id);
  await prisma.order.delete({ where: { id } });
}
