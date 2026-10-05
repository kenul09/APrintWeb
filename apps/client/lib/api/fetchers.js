import { portfolioService } from "./portfolioService";
import { normalizeWorks } from "@/lib/normalize";

// API fetch + normalize in one call. Used by the server loaders
// (lib/data.js, with Next.js cache options) and by client-side retries.
export async function fetchWorks(fetchOptions) {
  return normalizeWorks(await portfolioService.getAll(fetchOptions));
}
