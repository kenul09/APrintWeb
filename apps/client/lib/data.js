import "server-only";
import { portfolioService } from "@/lib/api/portfolioService";
import { productService } from "@/lib/api/productService";
import { normalizeProducts, normalizeWorks } from "@/lib/normalize";

// Server-side loaders for API data, cached for 5 minutes (ISR). They never
// throw: a failure is returned as { error: true } so the page renders a
// visible error state with a retry button instead of breaking.
export const REVALIDATE_SECONDS = 300;
const cache = { next: { revalidate: REVALIDATE_SECONDS } };

export async function loadWorks() {
  try {
    return { items: normalizeWorks(await portfolioService.getAll(cache)), error: false };
  } catch (error) {
    console.error("[data] Portfolio could not be loaded:", error);
    return { items: [], error: true };
  }
}

export async function loadProducts() {
  try {
    return { items: normalizeProducts(await productService.getAll({ activeOnly: true }, cache)), error: false };
  } catch (error) {
    console.error("[data] Products could not be loaded:", error);
    return { items: [], error: true };
  }
}
