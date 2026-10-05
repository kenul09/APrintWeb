import { getTranslator } from "@/i18n/getDictionary";
import { metadataFor } from "@/lib/seo";
import { loadProducts } from "@/lib/data";
import ServiceCards from "@/components/home/ServiceCards";
import PriceCalculator from "@/components/products/PriceCalculator";
import PriceList from "@/components/products/PriceList";
import CtaBlock from "@/components/layout/CtaBlock";
import SectionHead from "@/components/common/SectionHead";

export const revalidate = 300;

export const generateMetadata = metadataFor("products", "/products");

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
        <ServiceCards lang={lang} t={t} headingLevel="h2" eager />
      </section>

      <section className="container section reveal" aria-labelledby="calculator-title">
        <SectionHead id="calculator-title" title={t("calculator.title")} subtitle={t("calculator.intro")} />
        <PriceCalculator />
      </section>

      <section className="container section reveal" aria-labelledby="prices-title">
        <SectionHead id="prices-title" title={t("products.priceListTitle")} subtitle={t("products.priceListIntro")} />
        <PriceList initial={products} />
      </section>

      <CtaBlock lang={lang} />
    </>
  );
}
