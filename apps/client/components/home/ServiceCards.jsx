import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceCards.module.css";
import { categoryGroups } from "@/data/products";
import { optimizedSrc } from "@/lib/images";
import { localizePath } from "@/i18n/config";
import { ArrowRightIcon } from "@/components/icons/Icons";

// Visual category cards (image + title + subtitle), linking to
// /products/<slug>. Used on the homepage and the products page.
// `eager`: the cards are above the fold (products page) — skip lazy loading.
export default function ServiceCards({ lang, t, headingLevel = "h3", exclude, eager = false }) {
  const Heading = headingLevel;
  return (
    <ul className={styles.grid}>
      {categoryGroups.filter((group) => group.slug !== exclude).map((group) => {
        const base = `products.categories.${group.slug}`;
        return (
          <li key={group.slug} className={styles.item}>
            <article className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={optimizedSrc(group.image)}
                  alt=""
                  fill
                  loading={eager ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.body}>
                <Heading className={styles.title}>
                  <Link href={localizePath(lang, `/products/${group.slug}`)} className={styles.link}>
                    {t(`${base}.title`)}
                  </Link>
                </Heading>
                <p className={styles.subtitle}>{t(`${base}.subtitle`)}</p>
                <span className={styles.more} aria-hidden="true">
                  {t("products.cardCta")}
                  <ArrowRightIcon size={16} />
                </span>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
