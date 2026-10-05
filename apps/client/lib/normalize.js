import { resolveImageSrc } from "@/lib/images";

// Used via lib/api/fetchers.js (server loaders and client-side retries).
// Shape portfolio records for the UI: valid image only, newest first.
export function normalizeWorks(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((work) => ({
      id: work.id,
      title: work.title,
      description: work.description || "",
      category: work.category || "",
      createdAt: work.createdAt,
      src: resolveImageSrc(work.image),
    }))
    .filter((work) => work.src)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function normalizeProducts(data) {
  return Array.isArray(data) ? data.map(({ id, name, price, category }) => ({ id, name, price, category })) : [];
}
