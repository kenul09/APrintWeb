import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import type { CreatePortfolioInput, UpdatePortfolioInput } from "../validators/portfolio.schema";

export async function listPortfolio(options: { publishedOnly?: boolean; search?: string } = {}) {
  return prisma.portfolio.findMany({
    where: {
      ...(options.publishedOnly ? { isPublished: true } : {}),
      ...(options.search
        ? {
            OR: [
              { title: { contains: options.search, mode: "insensitive" as const } },
              { category: { contains: options.search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPortfolioById(id: string) {
  const item = await prisma.portfolio.findUnique({ where: { id } });
  if (!item) throw ApiError.notFound("Portfolio item not found");
  return item;
}

export async function createPortfolio(input: CreatePortfolioInput) {
  return prisma.portfolio.create({
    data: {
      title: input.title,
      category: input.category,
      image: input.image,
      description: input.description,
      isPublished: input.isPublished ?? true,
    },
  });
}

export async function updatePortfolio(id: string, input: UpdatePortfolioInput) {
  await getPortfolioById(id);
  return prisma.portfolio.update({ where: { id }, data: input });
}

export async function deletePortfolio(id: string) {
  await getPortfolioById(id);
  await prisma.portfolio.delete({ where: { id } });
}
