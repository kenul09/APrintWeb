import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileContactBar from "@/components/layout/MobileContactBar";
import { getDictionary } from "@/i18n/getDictionary";
import { createTranslator } from "@/i18n/translate";
import { hasLocale, locales } from "@/i18n/config";
import { themeInitScript } from "@/lib/themeStore";
import { localBusinessJsonLd, serializeJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

// Variable font — every weight. latin-ext carries the Azerbaijani glyphs
// (ə, ğ, ı, İ, ş, ç, ö, ü); cyrillic covers the Russian pages.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { t } = createTranslator(await getDictionary(lang));
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("meta.home.title"), template: t("meta.titleTemplate") },
    description: t("meta.home.description"),
    applicationName: t("meta.siteName"),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { t } = createTranslator(dict);
  const jsonLd = await localBusinessJsonLd(lang);

  return (
    <html lang={lang} className={inter.variable} suppressHydrationWarning>
      <body>
        {/* Plain inline script (not next/script): must run before first
            paint so an explicit light/dark choice never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a id="top" href="#main" className="skip-link">
          {t("common.skipToContent")}
        </a>
        <I18nProvider lang={lang} dict={dict}>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter lang={lang} />
          <MobileContactBar t={t} />
        </I18nProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
        <Analytics />
      </body>
    </html>
  );
}
