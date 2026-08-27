import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { parsePagination } from "../utils/pagination";
import * as customerService from "../services/customer.service";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const pagination = parsePagination(req);
  const { data, meta } = await customerService.listCustomers(pagination);
  res.status(200).json({ success: true, data, meta });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const data = await customerService.getCustomerById(req.params.id);
  res.status(200).json({ success: true, data });
});
