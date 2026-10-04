import { defaultLocale, locales, localizePath, ogLocales } from "@/i18n/config";
import { getTranslator } from "@/i18n/getDictionary";
import { CONTACT, SOCIAL } from "@/data/contactInfo";
import { SITE_URL } from "@/lib/site";

// hreflang map for a locale-free path, including x-default (→ az).
export function languageAlternates(path) {
  const languages = Object.fromEntries(locales.map((l) => [l, localizePath(l, path)]));
  languages["x-default"] = localizePath(defaultLocale, path);
  return languages;
}

// Shared generateMetadata body: title, description, canonical, hreflang,
// OpenGraph and Twitter for one page in one language. The OG image comes
// from app/[lang]/opengraph-image.js automatically.
export async function buildMetadata({ lang, path, title, description, absoluteTitle = false }) {
  const { t } = await getTranslator(lang);
  const url = localizePath(lang, path);
  const fullTitle = absoluteTitle ? title : t("meta.titleTemplate").replace("%s", title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: t("meta.siteName"),
      title: fullTitle,
      description,
      url,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export async function localBusinessJsonLd(lang) {
  const { t } = await getTranslator(lang);
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "A Print",
    description: t("meta.home.description"),
    url: `${SITE_URL}${localizePath(lang, "/")}`,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}${localizePath(lang, "/opengraph-image")}`,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      addressCountry: CONTACT.addressCountry,
    },
    openingHoursSpecification: CONTACT.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [SOCIAL.instagram],
    areaServed: "Baku",
    inLanguage: lang,
  };
  if (CONTACT.geo) data.geo = { "@type": "GeoCoordinates", ...CONTACT.geo };
  return data;
}

// JSON for a <script type="application/ld+json">, with "<" escaped so the
// payload can never close the script tag.
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
