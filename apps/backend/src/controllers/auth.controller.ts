import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as authService from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.register(req.body);
  res.status(201).json({ success: true, message: "Qeydiyyat uğurla tamamlandı", data });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { token, user } = await authService.login(req.body);
  res.status(200).json({ success: true, token, user });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw ApiError.unauthorized();
  const user = await authService.getProfile(req.user.sub);
  res.status(200).json({ success: true, data: user });
});
