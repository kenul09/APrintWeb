import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { intlLocales, localizePath } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { optimizedSrc } from "@/lib/images";
import { categoryGroups, findCategory } from "@/data/products";
import ServiceCards from "@/components/home/ServiceCards";
import PriceCalculator from "@/components/products/PriceCalculator";
import CtaBlock from "@/components/layout/CtaBlock";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryGroups.map((group) => ({ slug: group.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!findCategory(slug)) return {};
  const { t } = await getTranslator(lang);
  return buildMetadata({
    lang,
    path: `/products/${slug}`,
    title: t(`products.categories.${slug}.title`),
    description: t(`products.categories.${slug}.description`),
  });
}

export default async function ProductCategory({ params }) {
  const { lang, slug } = await params;
  const group = findCategory(slug);
  if (!group) notFound();

  const { t, tList } = await getTranslator(lang);
  const base = `products.categories.${slug}`;
  const items = tList(`${base}.items`);
  const unit = t(`products.itemsUnit.${new Intl.PluralRules(intlLocales[lang]).select(items.length)}`);
  const contactHref = `${localizePath(lang, "/contact")}?service=${slug}`;

  return (
    <>
      <section className="container page-hero">
        <Link href={localizePath(lang, "/products")} className={`btn-ghost ${styles.back}`}>
          <ArrowLeftIcon size={16} />
          {t("products.backToProducts")}
        </Link>
        <div className={styles.hero}>
          <div>
            <p className="badge">{t(`${base}.subtitle`)}</p>
            <h1>{t(`${base}.title`)}</h1>
            <p className="page-lead">{t(`${base}.description`)}</p>
            <div className={styles.actions}>
              <Link href={contactHref} className="btn-primary">
                {t("products.orderCta")}
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
          <div className={styles.media}>
            <Image
              src={optimizedSrc(group.image)}
              alt={t(`${base}.imageAlt`)}
              fill
              preload
              sizes="(min-width: 1024px) 600px, 92vw"
              className={styles.img}
            />
          </div>
        </div>
      </section>

      <section className="container section reveal" aria-labelledby="items-title">
        <div className="section-head">
          <h2 id="items-title">
            {t("products.itemsTitle")} <span className="accent-text">· {items.length} {unit}</span>
          </h2>
        </div>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="container section reveal" aria-labelledby="calculator-title">
        <div className="section-head">
          <div>
            <h2 id="calculator-title">{t("calculator.title")}</h2>
            <p className="section-subtitle">{t("calculator.intro")}</p>
          </div>
        </div>
        <PriceCalculator initialProduct={group.calculator} serviceSlug={slug} />
      </section>

      <section className="container section reveal" aria-labelledby="other-title">
        <div className="section-head">
          <h2 id="other-title">{t("products.otherCategories")}</h2>
        </div>
        <ServiceCards lang={lang} t={t} exclude={slug} />
      </section>

      <CtaBlock lang={lang} />
    </>
  );
}
