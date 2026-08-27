import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as productService from "../services/product.service";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const activeOnly = req.query.active === "true";
  const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
  const data = await productService.listProducts({ activeOnly, search });
  res.status(200).json({ success: true, data });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.getProductById(req.params.id);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.createProduct(req.body);
  res.status(201).json({ success: true, data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({ success: true, data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({ success: true, data: null });
});
