import "server-only";
import { heroSlides } from "@/data/heroSlides";
import { optimizedSrc } from "@/lib/images";

const MAX_SLIDES = 5;
// The two images the hero used before the collage — last-resort fallback.
const STATIC_MAIN = "/portfolio/4c42233b-2f06-468c-b8c8-b1d6d8783487.png";
const STATIC_SMALL = "/portfolio/Ab8b38d0f0d1b48f78286655b1a0e1b25i.png";

// Slides for the hero collage, fully translated on the server:
// 1. featured works from data/heroSlides.js (paired with the client's card);
// 2. otherwise the newest portfolio works from the API (`works`, may be
//    null when the API is down), each paired with the next one;
// 3. otherwise the original two static images as a single slide.
// Shape: { id, caption, main: { src, alt }, small: { src, alt } }
export function buildHeroSlides(t, works) {
  if (heroSlides.length) {
    return heroSlides.slice(0, MAX_SLIDES).map((slide) => {
      const product = `hero.collage.products.${slide.product}`;
      return {
        id: slide.key,
        caption: `${slide.client} · ${t(`${product}.label`)}`,
        main: { src: optimizedSrc(slide.main), alt: t("hero.collage.mainAlt", { client: slide.client, product: t(`${product}.alt`) }) },
        small: { src: optimizedSrc(slide.small), alt: t("hero.collage.smallAlt", { client: slide.client }) },
      };
    });
  }

  const newest = (works ?? []).slice(0, MAX_SLIDES);
  if (newest.length >= 2) {
    return newest.map((work, i) => {
      const partner = newest[(i + 1) % newest.length];
      return {
        id: String(work.id),
        caption: [work.title, work.category].filter(Boolean).join(" · "),
        main: { src: work.src, alt: work.description || work.title },
        small: { src: partner.src, alt: partner.description || partner.title },
      };
    });
  }

  return [
    {
      id: "static",
      caption: null,
      main: { src: optimizedSrc(STATIC_MAIN), alt: t("hero.mainImageAlt") },
      small: { src: optimizedSrc(STATIC_SMALL), alt: t("hero.smallImageAlt") },
    },
  ];
}
