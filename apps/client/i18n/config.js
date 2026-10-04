// Locale routing config shared by proxy.js, layouts, metadata and the
// language switcher. Every page lives under /<lang>/...; the default
// locale is not special-cased in URLs, so /az is as explicit as /en.
export const locales = ["az", "en", "ru"];
export const defaultLocale = "az";
export const LOCALE_COOKIE = "NEXT_LOCALE";

// OpenGraph locale tags per language.
export const ogLocales = { az: "az_AZ", en: "en_US", ru: "ru_RU" };

// BCP 47 tags used for Intl formatting (numbers, plurals).
export const intlLocales = { az: "az-AZ", en: "en-GB", ru: "ru-RU" };

export function hasLocale(value) {
  return locales.includes(value);
}

// localizePath("en", "/about") → "/en/about"; localizePath("en", "/") → "/en"
export function localizePath(lang, path = "/") {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

// "/en/about" → "/about"; "/en" → "/"
export function stripLocale(pathname) {
  return pathname.replace(LOCALE_PREFIX, "") || "/";
}
