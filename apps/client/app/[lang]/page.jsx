import Link from "next/link";
import styles from "./page.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { localizePath } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { loadWorks } from "@/lib/data";
import { buildHeroSlides } from "@/lib/heroSlides";
import { CUSTOMER_COUNT, PRODUCT_COUNT, RATING } from "@/data/siteStats";
import Typewriter from "@/components/common/Typewriter";
import StatGrid from "@/components/common/StatGrid";
import HeroCollage from "@/components/home/HeroCollage";
import ServiceCards from "@/components/home/ServiceCards";
import RecentWorks from "@/components/home/RecentWorks";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import Testimonials from "@/components/home/Testimonials";
import CtaBlock from "@/components/home/CtaBlock";
import { ArrowRightIcon } from "@/components/icons/Icons";
import SectionHead from "@/components/common/SectionHead";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  return buildMetadata({ lang, path: "/", title: t("meta.home.title"), description: t("meta.home.description"), absoluteTitle: true });
}

export default async function Home({ params }) {
  const { lang } = await params;
  const { t, tList } = await getTranslator(lang);
  const works = await loadWorks();

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <div>
          <p className="badge">
            <Typewriter words={tList("hero.words")} label={t("hero.typedLabel")} />
          </p>
          <h1 className={styles.title}>
            <span>{t("hero.line1")}</span>
            <span className="accent-text">{t("hero.line2")}</span>
          </h1>
          <p className="page-lead">{t("hero.description")}</p>
          <div className={styles.actions}>
            <Link href={localizePath(lang, "/products")} className="btn-primary">
              {t("hero.ctaPrimary")}
              <ArrowRightIcon size={18} />
            </Link>
            <Link href={localizePath(lang, "/contact")} className="btn-secondary">
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        <HeroCollage slides={buildHeroSlides(t, works)} stat={{ value: CUSTOMER_COUNT, label: t("hero.statLabel") }} />
      </section>

      <section className={`container ${styles.stats}`} aria-label={t("stats.label")}>
        <StatGrid
          label={t("stats.label")}
          items={[
            { value: CUSTOMER_COUNT, label: t("stats.customers") },
            { value: PRODUCT_COUNT, label: t("stats.products") },
            { value: t("stats.deliveryValue"), label: t("stats.delivery"), countUp: false },
            { value: RATING, label: t("stats.rating") },
          ]}
        />
      </section>

      <section className="container section reveal" aria-labelledby="services-title">
        <SectionHead
          id="services-title"
          title={t("services.title")}
          subtitle={t("services.subtitle")}
          action={
            <Link href={localizePath(lang, "/products")} className="btn-ghost">
              {t("services.viewAll")}
              <ArrowRightIcon size={16} />
            </Link>
          }
        />
        <ServiceCards lang={lang} t={t} />
      </section>

      <section className="container section reveal" aria-labelledby="works-title">
        <SectionHead
          id="works-title"
          title={t("works.title")}
          action={
            <Link href={localizePath(lang, "/portfolio")} className="btn-ghost">
              {t("works.viewAll")}
              <ArrowRightIcon size={16} />
            </Link>
          }
        />
        <RecentWorks initial={works} />
      </section>

      <section className="section reveal" aria-labelledby="partners-title">
        <div className={`container ${styles.partnersHead}`}>
          <h2 id="partners-title">{t("partners.title")}</h2>
          <p className="section-subtitle">{t("partners.subtitle")}</p>
        </div>
        <PartnersMarquee />
      </section>

      <Testimonials lang={lang} t={t} />
      <CtaBlock lang={lang} />
    </>
  );
}
