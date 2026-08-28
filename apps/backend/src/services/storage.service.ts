import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put, del } from "@vercel/blob";
import { ApiError } from "../utils/ApiError";

// Pluggable image storage: uses Vercel Blob (persistent, works on
// serverless/ephemeral hosts) when BLOB_READ_WRITE_TOKEN is configured,
// otherwise falls back to local disk under apps/backend/uploads/portfolio —
// but ONLY outside Vercel. On Vercel the deployed function's filesystem
// (/var/task) is read-only and, even where writable (/tmp), is ephemeral
// per-invocation, so local disk can never be a real "persistent" store
// there. `VERCEL` is set to "1" by the platform on every Vercel deployment
// (production, preview, and `vercel dev`), which is how we tell "must use
// Blob" apart from "plain local `npm run dev`, disk is fine."
//
// IMPORTANT: nothing here touches the filesystem or throws at import time —
// nothing to trip up at cold-start. All checks are deferred into saveImage/
// deleteImage, which only run when an upload/delete actually happens.
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const ON_VERCEL = process.env.VERCEL === "1";

export const storageBackend: "vercel-blob" | "local-disk" = BLOB_TOKEN ? "vercel-blob" : "local-disk";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "uploads", "portfolio");

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

/**
 * Persists an uploaded image and returns its permanent URL. With Vercel Blob
 * this is already an absolute, publicly reachable URL. With the local-disk
 * fallback (local development only) it's a relative "/uploads/portfolio/<file>"
 * path — the caller (portfolio.controller) turns that into an absolute URL.
 */
export async function saveImage(buffer: Buffer, mimetype: string, originalname: string): Promise<string> {
  const ext = EXTENSION_BY_MIME[mimetype] ?? path.extname(originalname) ?? "";
  const filename = `${crypto.randomUUID()}${ext}`;

  if (BLOB_TOKEN) {
    const blob = await put(`portfolio/${filename}`, buffer, {
      access: "public",
      contentType: mimetype,
      token: BLOB_TOKEN,
    });
    return blob.url;
  }

  if (ON_VERCEL) {
    // Never silently write to a Vercel function's filesystem — it isn't
    // persistent, and in production it isn't even writable. Fail the
    // upload clearly instead of pretending it succeeded.
    throw ApiError.internal(
      "Şəkil saxlama xidməti konfiqurasiya olunmayıb (BLOB_READ_WRITE_TOKEN tapılmadı)."
    );
  }

  await fsp.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await fsp.writeFile(path.join(LOCAL_UPLOAD_DIR, filename), buffer);
  return `/uploads/portfolio/${filename}`;
}

function isSelfManagedLocalPath(image: string): string | null {
  const match = image.match(/\/uploads\/portfolio\/([^/?#]+)$/);
  return match ? match[1] : null;
}

function isSelfManagedBlobUrl(image: string): boolean {
  try {
    return new URL(image).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

/**
 * Best-effort delete of an image from storage. Only ever acts on URLs this
 * service itself produced (local /uploads/portfolio/* paths or our own Blob
 * store) — external URLs (e.g. img.magnific.com) or images still served from
 * apps/client/public are silently left alone, since we don't own them.
 */
export async function deleteImage(image: string): Promise<void> {
  if (BLOB_TOKEN && isSelfManagedBlobUrl(image)) {
    await del(image, { token: BLOB_TOKEN }).catch(() => {});
    return;
  }

  if (ON_VERCEL) return; // nothing local to clean up on a serverless filesystem

  const filename = isSelfManagedLocalPath(image);
  if (!filename) return;
  await fsp.unlink(path.join(LOCAL_UPLOAD_DIR, filename)).catch(() => {});
}
