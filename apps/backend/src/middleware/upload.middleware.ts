import multer from "multer";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg"]);

// In-memory buffer, not disk: the destination (local disk vs. Vercel Blob)
// is decided by storage.service.ts, which needs the raw bytes either way.
const singlePortfolioImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter(_req, file, cb) {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(ApiError.badRequest("Yalnız PNG və JPG/JPEG şəkillərinə icazə verilir"));
      return;
    }
    cb(null, true);
  },
}).single("image");

// Wraps multer so its errors (wrong type, file too large) reach the
// centralized error middleware as a proper ApiError instead of a raw
// MulterError falling through to the generic 500 handler.
export function uploadPortfolioImage(req: Request, res: Response, next: NextFunction) {
  singlePortfolioImage(req, res, (err: unknown) => {
    if (!err) {
      next();
      return;
    }
    if (err instanceof ApiError) {
      next(err);
      return;
    }
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      next(ApiError.badRequest("Şəkil 5MB-dan böyük ola bilməz"));
      return;
    }
    next(ApiError.badRequest("Şəkil yüklənə bilmədi"));
  });
}
