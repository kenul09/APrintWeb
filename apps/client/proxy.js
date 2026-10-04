import { NextResponse } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale } from "@/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

// Highest-q supported language from Accept-Language ("ru-RU,ru;q=0.9,en;q=0.8"
// → "ru"). Region subtags are ignored; az/en/ru are all we serve.
function fromAcceptLanguage(header) {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((entry) => entry.lang && entry.q > 0)
    .sort((a, b) => b.q - a.q);
  return ranked.find((entry) => hasLocale(entry.lang))?.lang ?? null;
}

function detectLocale(request) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved)) return saved;
  return fromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // Already localized: remember the choice (an explicit visit to /en counts
  // as choosing English) so the next unprefixed visit lands on it.
  if (hasLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except API routes, Next internals, metadata files and
  // anything with a file extension (public/ assets). /admin is redirected
  // in next.config.mjs before the proxy runs.
  matcher: [
    "/((?!api|_next|admin|sitemap.xml|robots.txt|favicon.ico|icon|apple-icon|manifest.webmanifest|.*\\..*).*)",
  ],
};
