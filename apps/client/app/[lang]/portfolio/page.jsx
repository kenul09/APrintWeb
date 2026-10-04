import { Suspense } from "react";
import { getTranslator } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/seo";
import { loadWorks } from "@/lib/data";
import { PortfolioGallery, PortfolioGalleryFromUrl } from "@/components/portfolio/PortfolioGallery";
import CtaBlock from "@/components/layout/CtaBlock";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  return buildMetadata({ lang, path: "/portfolio", title: t("meta.portfolio.title"), description: t("meta.portfolio.description") });
}

export default async function Portfolio({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  const works = await loadWorks();

  return (
    <>
      <section className="container page-hero">
        <p className="badge">{t("portfolio.badge")}</p>
        <h1>{t("portfolio.title")}</h1>
        <p className="page-lead">{t("portfolio.intro")}</p>
      </section>

      <section className="container" aria-label={t("portfolio.title")}>
        {/* The prerendered HTML shows the unfiltered grid; the URL filter
            (?category=) applies once the client reads the search params. */}
        <Suspense fallback={<PortfolioGallery initial={works} />}>
          <PortfolioGalleryFromUrl initial={works} />
        </Suspense>
      </section>

      <CtaBlock lang={lang} />
    </>
  );
}
