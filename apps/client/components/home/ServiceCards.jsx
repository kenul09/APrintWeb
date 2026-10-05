import Image from "next/image";
import Link from "next/link";
import defaultStyles from "./ServiceCards.module.css";
import minimalStyles from "./ServiceCardsMinimal.module.css";
import { categoryGroups } from "@/data/products";
import { optimizedSrc } from "@/lib/images";
import { localizePath } from "@/i18n/config";
import { ArrowRightIcon } from "@/components/icons/Icons";

// Visual category cards (image + title + subtitle), linking to
// /products/<slug>. Used on the homepage, the products page and category
// pages. `variant="minimal"` (products page) swaps in a stylesheet with the
// same class names: image-led, borderless cards. `eager`: the cards are
// above the fold — skip lazy loading.
export default function ServiceCards({ lang, t, headingLevel = "h3", exclude, eager = false, variant = "default" }) {
  const Heading = headingLevel;
  const styles = variant === "minimal" ? minimalStyles : defaultStyles;
  const sizes =
    variant === "minimal"
      ? "(min-width: 1100px) 290px, (min-width: 560px) 46vw, 92vw"
      : "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw";
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
                  sizes={sizes}
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
                  <span className={styles.moreText}>{t("products.cardCta")}</span>
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
