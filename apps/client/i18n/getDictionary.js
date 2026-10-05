import "server-only";
import { cache } from "react";
import { createTranslator } from "./translate";
import { defaultLocale, hasLocale } from "./config";

const dictionaries = {
  az: () => import("./dictionaries/az").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
};

export async function getDictionary(lang) {
  return dictionaries[hasLocale(lang) ? lang : defaultLocale]();
}

// Convenience for Server Components: { dict, t, tList } in one call.
// Memoized per request — layout, page, footer, CTA and metadata all ask.
export const getTranslator = cache(async (lang) => {
  const dict = await getDictionary(lang);
  return { dict, ...createTranslator(dict) };
});
