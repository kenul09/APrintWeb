import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put, del } from "@vercel/blob";
import { ApiError } from "../utils/ApiError";

const ON_VERCEL = process.env.VERCEL === "1";

/**
 * Image storage backend.
 *
 * Vercel:
 *   Uses Vercel Blob.
 *
 * Local development:
 *   Uses local disk.
 */
export const storageBackend: "vercel-blob" | "local-disk" =
  ON_VERCEL ? "vercel-blob" : "local-disk";

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
 * Save an uploaded portfolio image.
 *
 * On Vercel:
 *   The image is stored in Vercel Blob.
 *
 * Locally:
 *   The image is stored under:
 *   uploads/portfolio
 */
export async function saveImage(
  buffer: Buffer,
  mimetype: string,
  originalname: string
): Promise<string> {
  const ext =
    EXTENSION_BY_MIME[mimetype] ||
    path.extname(originalname) ||
    "";

  const filename = `${crypto.randomUUID()}${ext}`;

  /**
   * VERCEL
   *
   * Vercel Blob is used in production.
   *
   * Do not pass BLOB_READ_WRITE_TOKEN manually.
   */
  if (ON_VERCEL) {
    try {
      const blob = await put(
        `portfolio/${filename}`,
        buffer,
        {
          access: "public",
          contentType: mimetype,
        }
      );

      return blob.url;
    } catch (error) {
      console.error(
        "Vercel Blob upload failed:",
        error
      );

      throw ApiError.internal(
        "Şəkil Vercel Blob yaddaşına yüklənə bilmədi."
      );
    }
  }

  /**
   * LOCAL DEVELOPMENT
   *
   * When running npm run dev locally,
   * store images on the local filesystem.
   */
  try {
    await fsp.mkdir(
      LOCAL_UPLOAD_DIR,
      {
        recursive: true,
      }
    );

    await fsp.writeFile(
      path.join(
        LOCAL_UPLOAD_DIR,
        filename
      ),
      buffer
    );

    return `/uploads/portfolio/${filename}`;
  } catch (error) {
    console.error(
      "Local image upload failed:",
      error
    );

    throw ApiError.internal(
      "Şəkil lokal yaddaşa yazıla bilmədi."
    );
  }
}

/**
 * Checks whether an image belongs to our
 * local portfolio storage.
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
 * Checks whether an image belongs to our
 * Vercel Blob storage.
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
 * Only images created by this service
 * are deleted.
 *
 * External images are ignored.
 */
export async function deleteImage(
  image: string
): Promise<void> {
  /**
   * VERCEL BLOB
   */
  if (
    ON_VERCEL &&
    isSelfManagedBlobUrl(image)
  ) {
    try {
      await del(image);
    } catch (error) {
      console.error(
        "Vercel Blob delete failed:",
        error
      );
    }

    return;
  }

  /**
   * LOCAL DEVELOPMENT
   */
  if (ON_VERCEL) {
    return;
  }

  const filename =
    isSelfManagedLocalPath(image);

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
    // Ignore missing local files.
  }
}