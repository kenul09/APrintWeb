import { Suspense } from "react";
import { getTranslator } from "@/i18n/getDictionary";
import { metadataFor } from "@/lib/seo";
import { loadWorks } from "@/lib/data";
import { PortfolioGallery, PortfolioGalleryFromUrl } from "@/components/portfolio/PortfolioGallery";
import CtaBlock from "@/components/layout/CtaBlock";

export const revalidate = 300;

export const generateMetadata = metadataFor("portfolio", "/portfolio");

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
