import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put, del } from "@vercel/blob";
import { ApiError } from "../utils/ApiError";

// Pluggable image storage:
// - Vercel Blob when BLOB_READ_WRITE_TOKEN is configured
// - Local disk only outside Vercel
//
// IMPORTANT:
// Read BLOB_READ_WRITE_TOKEN at runtime inside the functions.
// This ensures the environment variable is resolved from the
// current Vercel runtime environment when an upload/delete occurs.

const ON_VERCEL = process.env.VERCEL === "1";

export const storageBackend: "vercel-blob" | "local-disk" =
  process.env.BLOB_READ_WRITE_TOKEN
    ? "vercel-blob"
    : "local-disk";

const LOCAL_UPLOAD_DIR = path.join(
  process.cwd(),
  "uploads",
  "portfolio"
);

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

/**
 * Returns the Vercel Blob token from the current runtime environment.
 */
function getBlobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Persists an uploaded image and returns its permanent URL.
 *
 * Vercel:
 *   Uses Vercel Blob with BLOB_READ_WRITE_TOKEN.
 *
 * Local development:
 *   Falls back to local disk under:
 *   apps/backend/uploads/portfolio
 */
export async function saveImage(
  buffer: Buffer,
  mimetype: string,
  originalname: string
): Promise<string> {
  const blobToken = getBlobToken();

  const ext =
    EXTENSION_BY_MIME[mimetype] ??
    path.extname(originalname) ??
    "";

  const filename = `${crypto.randomUUID()}${ext}`;

  // Use Vercel Blob when the token is available.
  if (blobToken) {
    const blob = await put(
      `portfolio/${filename}`,
      buffer,
      {
        access: "public",
        contentType: mimetype,
        token: blobToken,
      }
    );

    return blob.url;
  }

  // Never use local filesystem storage on Vercel.
  if (ON_VERCEL) {
    throw ApiError.internal(
      "Şəkil saxlama xidməti konfiqurasiya olunmayıb (BLOB_READ_WRITE_TOKEN tapılmadı)."
    );
  }

  // Local development fallback.
  await fsp.mkdir(LOCAL_UPLOAD_DIR, {
    recursive: true,
  });

  await fsp.writeFile(
    path.join(LOCAL_UPLOAD_DIR, filename),
    buffer
  );

  return `/uploads/portfolio/${filename}`;
}

/**
 * Checks whether an image path belongs to our local portfolio storage.
 */
function isSelfManagedLocalPath(
  image: string
): string | null {
  const match = image.match(
    /\/uploads\/portfolio\/([^/?#]+)$/
  );

  return match ? match[1] : null;
}

/**
 * Checks whether an image URL belongs to our Vercel Blob storage.
 */
function isSelfManagedBlobUrl(
  image: string
): boolean {
  try {
    return new URL(image)
      .hostname
      .endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

/**
 * Best-effort deletion of an image from storage.
 *
 * Only deletes:
 * - our own Vercel Blob URLs
 * - our own local /uploads/portfolio/* paths
 *
 * External images are ignored.
 */
export async function deleteImage(
  image: string
): Promise<void> {
  const blobToken = getBlobToken();

  // Delete from Vercel Blob.
  if (
    blobToken &&
    isSelfManagedBlobUrl(image)
  ) {
    await del(image, {
      token: blobToken,
    }).catch(() => {});

    return;
  }

  // Nothing to delete locally on Vercel.
  if (ON_VERCEL) {
    return;
  }

  // Delete local development file.
  const filename = isSelfManagedLocalPath(image);

  if (!filename) {
    return;
  }

  await fsp
    .unlink(
      path.join(LOCAL_UPLOAD_DIR, filename)
    )
    .catch(() => {});
}