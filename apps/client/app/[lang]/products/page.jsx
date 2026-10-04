import { getTranslator } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/seo";
import { loadProducts } from "@/lib/data";
import ServiceCards from "@/components/home/ServiceCards";
import PriceCalculator from "@/components/products/PriceCalculator";
import PriceList from "@/components/products/PriceList";
import CtaBlock from "@/components/layout/CtaBlock";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  return buildMetadata({ lang, path: "/products", title: t("meta.products.title"), description: t("meta.products.description") });
}

export default async function Products({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  const products = await loadProducts();

  return (
    <>
      <section className="container page-hero">
        <p className="badge">{t("products.badge")}</p>
        <h1>{t("products.title")}</h1>
        <p className="page-lead">{t("products.intro")}</p>
      </section>

      <section className="container" aria-label={t("services.title")}>
        <ServiceCards lang={lang} t={t} headingLevel="h2" />
      </section>

      <section className="container section reveal" aria-labelledby="calculator-title">
        <div className="section-head">
          <div>
            <h2 id="calculator-title">{t("calculator.title")}</h2>
            <p className="section-subtitle">{t("calculator.intro")}</p>
          </div>
        </div>
        <PriceCalculator />
      </section>

      <section className="container section reveal" aria-labelledby="prices-title">
        <div className="section-head">
          <div>
            <h2 id="prices-title">{t("products.priceListTitle")}</h2>
            <p className="section-subtitle">{t("products.priceListIntro")}</p>
          </div>
        </div>
        <PriceList initial={products} />
      </section>

      <CtaBlock lang={lang} />
    </>
  );
}
