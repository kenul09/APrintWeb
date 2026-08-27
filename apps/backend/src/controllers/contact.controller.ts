import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { parsePagination } from "../utils/pagination";
import * as contactService from "../services/contact.service";
import * as emailService from "../services/email.service";

export const create = asyncHandler(async (req: Request, res: Response) => {
  // 1. Save first — the submission must be safely stored regardless of
  //    whether the notification email succeeds.
  const data = await contactService.createMessage(req.body);

  // 2. Best-effort notification. A failure here (bad SMTP creds, network,
  //    provider outage) must never roll back the DB record or fail the
  //    request — it's just logged, and the message stays visible to the
  //    admin via GET /api/contact regardless.
  try {
    await emailService.sendContactNotification(data);
  } catch (error) {
    console.error("[contact.controller] Failed to send contact notification email:", error);
  }

  res.status(201).json({ success: true, message: "Müraciətiniz uğurla göndərildi.", data });
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const pagination = parsePagination(req);
  const unreadOnly = req.query.unreadOnly === "true";
  const { data, meta } = await contactService.listMessages({ ...pagination, unreadOnly });
  res.status(200).json({ success: true, data, meta });
});

export const markRead = asyncHandler(async (req: Request, res: Response) => {
  const data = await contactService.markMessageRead(req.params.id);
  res.status(200).json({ success: true, data });
});

export const markUnread = asyncHandler(async (req: Request, res: Response) => {
  const data = await contactService.markMessageUnread(req.params.id);
  res.status(200).json({ success: true, data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await contactService.deleteMessage(req.params.id);
  res.status(200).json({ success: true, data: null });
});
