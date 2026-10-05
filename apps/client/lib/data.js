import "server-only";
import { API_BASE_URL } from "@/lib/api/client";
import { fetchWorks } from "@/lib/api/fetchers";

// Server-side loader for portfolio data, cached for 5 minutes (ISR). It
// never throws: when the backend can't be loaded it logs a warning and
// returns null, and the page shows a friendly "temporarily unavailable" notice with
// a retry button and WhatsApp/contact links instead of breaking.
const REVALIDATE_SECONDS = 300;
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
// Results are memoized per URL for REVALIDATE_SECONDS, so the HEAD checks
// don't repeat on every render (fetch() caching doesn't cover HEAD).
const uploadChecks = new Map(); // url -> { ok, at }

async function uploadExists(url) {
  const hit = uploadChecks.get(url);
  if (hit && Date.now() - hit.at < REVALIDATE_SECONDS * 1000) return hit.ok;
  let ok = false;
  try {
    ok = (await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(3000), ...cache })).ok;
  } catch {
    ok = false;
  }
  uploadChecks.set(url, { ok, at: Date.now() });
  return ok;
}

async function withExistingUploads(works) {
  const checks = await Promise.all(
    works.map((work) => {
      if (!work.src.startsWith("http")) return true;
      const { pathname } = new URL(work.src);
      return pathname.startsWith("/uploads/") ? uploadExists(`${API_ORIGIN}${pathname}`) : true;
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
    return await withExistingUploads(await fetchWorks(cache));
  } catch (error) {
    warn("Portfolio", error);
    return null;
  }
}
