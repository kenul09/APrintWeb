import { getTranslator } from "@/i18n/getDictionary";
import { metadataFor } from "@/lib/seo";
import ServiceCards from "@/components/home/ServiceCards";
import PriceCalculator from "@/components/products/PriceCalculator";
import SectionHead from "@/components/common/SectionHead";
import styles from "./page.module.css";

export const generateMetadata = metadataFor("products", "/products");

export default async function Products({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);

  return (
    <>
      <section className="container page-hero">
        <p className="badge">{t("products.badge")}</p>
        <h1>{t("products.title")}</h1>
        <p className="page-lead">{t("products.intro")}</p>
      </section>

      <section className="container" aria-label={t("services.title")}>
        <ServiceCards lang={lang} t={t} headingLevel="h2" eager variant="minimal" />
      </section>

      <section className={`container section reveal ${styles.calculatorSection}`} aria-labelledby="calculator-title">
        <SectionHead id="calculator-title" title={t("calculator.title")} subtitle={t("calculator.intro")} />
        <PriceCalculator />
      </section>
    </>
  );
}
