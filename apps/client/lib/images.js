import manifest from "@/data/imageManifest.json";

// Optimized WebP for a public/ path when scripts/optimize-images.mjs has
// produced one; otherwise the path unchanged.
export function optimizedSrc(src) {
  return manifest[src]?.webp ?? src;
}

export function imageSize(src) {
  const entry = manifest[src];
  return entry ? { width: entry.width, height: entry.height } : null;
}

// The API stores `image` as either an absolute URL (http/https) or a path
// into apps/client/public (e.g. "/portfolio/xxx.png"). Anything else (null,
// empty, a bare filename, …) is bad data that would make next/image throw —
// such records are skipped instead of crashing the page.
export function resolveImageSrc(image) {
  if (typeof image !== "string") return null;
  const trimmed = image.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return optimizedSrc(trimmed);
  return null;
}
