import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { parsePagination } from "../utils/pagination";
import * as blogService from "../services/blog.service";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const pagination = parsePagination(req);
  // Admin (authenticated) sees drafts too; the public client only ever
  // calls this without a token, so it only ever sees published posts.
  const publishedOnly = !req.user;
  const { data, meta } = await blogService.listPosts({ ...pagination, publishedOnly });
  res.status(200).json({ success: true, data, meta });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.getPostById(req.params.id);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.createPost(req.body);
  res.status(201).json({ success: true, message: "Post əlavə edildi", data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.updatePost(req.params.id, req.body);
  res.status(200).json({ success: true, message: "Post yeniləndi", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await blogService.deletePost(req.params.id);
  res.status(200).json({ success: true, message: "Post silindi", data: null });
});
