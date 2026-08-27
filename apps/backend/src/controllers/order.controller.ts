import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { parsePagination } from "../utils/pagination";
import * as orderService from "../services/order.service";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const pagination = parsePagination(req);
  const status = typeof req.query.status === "string" ? req.query.status : undefined;
  const sort = req.query.sort === "asc" ? "asc" : "desc";
  const { data, meta } = await orderService.listOrders({ ...pagination, status, sort });
  res.status(200).json({ success: true, data, meta });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const data = await orderService.getOrderById(req.params.id);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await orderService.createOrder(req.body);
  res.status(201).json({ success: true, message: "Sifariş uğurla yaradıldı", data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await orderService.updateOrder(req.params.id, req.body);
  res.status(200).json({ success: true, message: "Sifariş yeniləndi", data });
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const data = await orderService.updateOrderStatus(req.params.id, req.body.status);
  res.status(200).json({ success: true, message: "Sifariş statusu yeniləndi", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await orderService.deleteOrder(req.params.id);
  res.status(200).json({ success: true, message: "Sifariş silindi", data: null });
});
