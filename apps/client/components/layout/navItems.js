// Primary pages, shared by the header and the footer. Paths are
// locale-free; components prefix them with the current language.
export const NAV_ITEMS = [
  { path: "/", key: "nav.home" },
  { path: "/about", key: "nav.about" },
  { path: "/products", key: "nav.products" },
  { path: "/portfolio", key: "nav.portfolio" },
  { path: "/contact", key: "nav.contact" },
];

export function isActivePath(current, path) {
  return path === "/" ? current === "/" : current === path || current.startsWith(`${path}/`);
}
