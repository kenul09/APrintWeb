import "server-only";
import { API_BASE_URL } from "@/lib/api/client";
import { portfolioService } from "@/lib/api/portfolioService";
import { productService } from "@/lib/api/productService";
import { normalizeProducts, normalizeWorks } from "@/lib/normalize";

// Server-side loaders for API data, cached for 5 minutes (ISR). They never
// throw: when the backend can't be loaded they log a warning and return
// null, and the page shows a friendly "temporarily unavailable" notice with
// a retry button and WhatsApp/contact links instead of breaking.
export const REVALIDATE_SECONDS = 300;
const cache = { next: { revalidate: REVALIDATE_SECONDS } };
const API_ORIGIN = new URL(API_BASE_URL).origin;

function warn(what, error) {
  const cause = error?.cause?.code ? ` [${error.cause.code}]` : "";
  console.warn(`[data] ${what} unavailable — ${error?.message ?? error}${cause}`);
}

// Portfolio images uploaded through the admin panel are served by the
// backend itself (/uploads/...). A record whose file is gone (e.g. a
// database copied without its uploads folder) would render as a broken
// image, so such records are skipped — and listed in the server log.
async function withExistingUploads(works) {
  const checks = await Promise.all(
    works.map(async (work) => {
      if (!work.src.startsWith("http")) return true;
      const url = new URL(work.src);
      if (!url.pathname.startsWith("/uploads/")) return true;
      try {
        const target = `${API_ORIGIN}${url.pathname}`;
        const res = await fetch(target, { method: "HEAD", signal: AbortSignal.timeout(3000), ...cache });
        return res.ok;
      } catch {
        return false;
      }
    })
  );
  const missing = works.filter((_, i) => !checks[i]);
  if (missing.length) {
    console.warn(`[data] Skipping ${missing.length} portfolio item(s) whose image file is missing:`, missing.map((w) => w.src));
  }
  return works.filter((_, i) => checks[i]);
}

export async function loadWorks() {
  try {
    return await withExistingUploads(normalizeWorks(await portfolioService.getAll(cache)));
  } catch (error) {
    warn("Portfolio", error);
    return null;
  }
}

export async function loadProducts() {
  try {
    return normalizeProducts(await productService.getAll({ activeOnly: true }, cache));
  } catch (error) {
    warn("Products", error);
    return null;
  }
}
