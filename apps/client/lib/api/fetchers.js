import { portfolioService } from "./portfolioService";
import { productService } from "./productService";
import { normalizeProducts, normalizeWorks } from "@/lib/normalize";

// API fetch + normalize in one call. Used by the server loaders
// (lib/data.js, with Next.js cache options) and by client-side retries.
export async function fetchWorks(fetchOptions) {
  return normalizeWorks(await portfolioService.getAll(fetchOptions));
}

export async function fetchProducts(fetchOptions) {
  return normalizeProducts(await productService.getAll({ activeOnly: true }, fetchOptions));
}
