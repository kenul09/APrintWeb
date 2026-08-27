import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as dashboardService from "../services/dashboard.service";

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const data = await dashboardService.getStats();
  res.status(200).json({ success: true, data });
});
