import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as portfolioService from "../services/portfolio.service";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
  const data = await portfolioService.listPortfolio({ publishedOnly: !req.user, search });
  res.status(200).json({ success: true, data });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const data = await portfolioService.getPortfolioById(req.params.id);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await portfolioService.createPortfolio(req.body);
  res.status(201).json({ success: true, data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await portfolioService.updatePortfolio(req.params.id, req.body);
  res.status(200).json({ success: true, data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await portfolioService.deletePortfolio(req.params.id);
  res.status(200).json({ success: true, data: null });
});
