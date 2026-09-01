import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put, del } from "@vercel/blob";
import { ApiError } from "../utils/ApiError";

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

function getBlobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Save an uploaded portfolio image.
 *
 * Production / Vercel:
 * Uses Vercel Blob.
 *
 * Local development:
 * Uses local disk.
 */
export async function saveImage(
  buffer: Buffer,
  mimetype: string,
  originalname: string
): Promise<string> {
  const blobToken = getBlobToken();

  const ext =
    EXTENSION_BY_MIME[mimetype] ||
    path.extname(originalname) ||
    "";

  const filename = `${crypto.randomUUID()}${ext}`;

  // Vercel Blob storage
  if (blobToken) {
    try {
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
    } catch (error) {
      console.error("Vercel Blob upload failed:", error);

      throw ApiError.internal(
        "Şəkil Vercel Blob yaddaşına yüklənə bilmədi."
      );
    }
  }

  // Vercel-də local filesystem istifadə etmək olmaz.
  if (ON_VERCEL) {
    console.error(
      "BLOB_READ_WRITE_TOKEN is missing in the Vercel runtime."
    );

    throw ApiError.internal(
      "Şəkil saxlama xidməti konfiqurasiya olunmayıb (BLOB_READ_WRITE_TOKEN tapılmadı)."
    );
  }

  // Local development fallback
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
 * Checks whether an image belongs to our local portfolio storage.
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
 * Checks whether an image belongs to our Vercel Blob storage.
 */
function isSelfManagedBlobUrl(
  image: string
): boolean {
  try {
    const url = new URL(image);

    return url.hostname.endsWith(
      ".public.blob.vercel-storage.com"
    );
  } catch {
    return false;
  }
}

/**
 * Delete an image from storage.
 *
 * Only images created by this service are deleted.
 * External images are ignored.
 */
export async function deleteImage(
  image: string
): Promise<void> {
  const blobToken = getBlobToken();

  // Delete Vercel Blob image
  if (
    blobToken &&
    isSelfManagedBlobUrl(image)
  ) {
    try {
      await del(image, {
        token: blobToken,
      });
    } catch (error) {
      console.error(
        "Vercel Blob delete failed:",
        error
      );
    }

    return;
  }

  // No local filesystem cleanup on Vercel
  if (ON_VERCEL) {
    return;
  }

  // Delete local development image
  const filename = isSelfManagedLocalPath(image);

  if (!filename) {
    return;
  }

  try {
    await fsp.unlink(
      path.join(
        LOCAL_UPLOAD_DIR,
        filename
      )
    );
  } catch {
    // Ignore missing local files
  }
}