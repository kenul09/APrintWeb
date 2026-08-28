import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put, del } from "@vercel/blob";

// Pluggable image storage: uses Vercel Blob (persistent, works on
// serverless/ephemeral hosts) when BLOB_READ_WRITE_TOKEN is configured,
// otherwise falls back to local disk under apps/backend/uploads/portfolio
// for local development. Never hardcode a token — server-side env var only.
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export const storageBackend: "vercel-blob" | "local-disk" = BLOB_TOKEN ? "vercel-blob" : "local-disk";

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "uploads", "portfolio");
if (storageBackend === "local-disk") {
  fs.mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
}

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

/**
 * Persists an uploaded image and returns its permanent URL. With Vercel Blob
 * this is already an absolute, publicly reachable URL. With the local-disk
 * fallback it's a relative "/uploads/portfolio/<file>" path — the caller
 * (portfolio.controller) turns that into an absolute URL for the response.
 */
export async function saveImage(buffer: Buffer, mimetype: string, originalname: string): Promise<string> {
  const ext = EXTENSION_BY_MIME[mimetype] ?? path.extname(originalname) ?? "";
  const filename = `${crypto.randomUUID()}${ext}`;

  if (storageBackend === "vercel-blob") {
    const blob = await put(`portfolio/${filename}`, buffer, {
      access: "public",
      contentType: mimetype,
      token: BLOB_TOKEN,
    });
    return blob.url;
  }

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
  if (storageBackend === "vercel-blob" && isSelfManagedBlobUrl(image)) {
    await del(image, { token: BLOB_TOKEN }).catch(() => {});
    return;
  }

  const filename = isSelfManagedLocalPath(image);
  if (!filename) return;
  await fsp.unlink(path.join(LOCAL_UPLOAD_DIR, filename)).catch(() => {});
}
