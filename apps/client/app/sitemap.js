import { locales, localizePath } from "@/i18n/config";
import { categoryGroups } from "@/data/products";
import { languageAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PATHS = ["/", "/about", "/products", ...categoryGroups.map((g) => `/products/${g.slug}`), "/portfolio", "/contact"];

// One entry per page and language, each listing its translations.
export default function sitemap() {
  const absolute = (path) => `${SITE_URL}${path}`;
  return PATHS.flatMap((path) =>
    locales.map((lang) => ({
      url: absolute(localizePath(lang, path)),
      lastModified: new Date(),
      changeFrequency: path === "/portfolio" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, absolute(v)])),
      },
    }))
  );
}
