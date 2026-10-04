// Product categories. All text (title, subtitle, description, item list,
// image alt) lives in the dictionaries under products.categories.<slug>;
// this file only holds structure. `slug` is the URL (/products/<slug>) and
// the contact form's ?service= value. `calculator` preselects a product in
// the price calculator on the category page.
export const categoryGroups = [
  { slug: "print", image: "/portfolio/Ab8b38d0f0d1b48f78286655b1a0e1b25i.png", calculator: "businessCard" },
  { slug: "promo", image: "/portfolio/c602db84-5d02-4b7a-879a-480e67f37cc1.png", calculator: "sticker" },
  { slug: "signage", image: "/portfolio/b2af5af4-3ba6-48d4-8525-7375914567f1.png", calculator: "rollup" },
  { slug: "catalogs", image: "/portfolio/9eab215a-2f1d-4dad-8bc7-2bb729c582bc.png", calculator: "booklet" },
];

export function findCategory(slug) {
  return categoryGroups.find((group) => group.slug === slug) ?? null;
}
