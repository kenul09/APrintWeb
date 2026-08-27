import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";
import type { CreateProductInput, UpdateProductInput } from "../validators/product.schema";

async function uniqueSlugFrom(name: string, ignoreId?: string): Promise<string> {
  const base = slugify(name) || "product";
  let candidate = base;
  let attempt = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === ignoreId) return candidate;
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
}

export async function listProducts(options: { activeOnly?: boolean; search?: string } = {}) {
  return prisma.product.findMany({
    where: {
      ...(options.activeOnly ? { isActive: true } : {}),
      ...(options.search
        ? {
            OR: [
              { name: { contains: options.search, mode: "insensitive" as const } },
              { category: { contains: options.search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw ApiError.notFound("Product not found");
  return product;
}

export async function createProduct(input: CreateProductInput) {
  const slug = await uniqueSlugFrom(input.name);
  return prisma.product.create({
    data: {
      name: input.name,
      category: input.category,
      description: input.description,
      price: input.price,
      image: input.image,
      isActive: input.isActive ?? true,
      slug,
    },
  });
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  await getProductById(id);

  const data: Record<string, unknown> = { ...input };
  if (input.name) {
    data.slug = await uniqueSlugFrom(input.name, id);
  }

  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  await getProductById(id);
  await prisma.product.delete({ where: { id } });
}
