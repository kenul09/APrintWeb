import type { Request } from "express";

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  search: string;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function parsePagination(req: Request): PaginationParams {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(req.query.limit) || DEFAULT_LIMIT));
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  return { page, limit, skip: (page - 1) * limit, search };
}

export function paginationMeta(total: number, { page, limit }: PaginationParams) {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}
