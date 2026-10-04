import Image from "next/image";
import Link from "next/link";
import styles from "./WorkCard.module.css";
import { ExpandIcon } from "@/components/icons/Icons";

// Portfolio card: image, title, category. Either a link (`href`, homepage
// preview) or a button that opens the lightbox (`onOpen`, portfolio page).
export default function WorkCard({ work, href, onOpen, openLabel, sizes, headingLevel = "h3" }) {
  const Heading = headingLevel;
  const trigger = href ? (
    <Link href={href} className={styles.trigger}>
      {work.title}
    </Link>
  ) : (
    <button type="button" className={styles.trigger} onClick={onOpen} aria-label={openLabel} aria-haspopup="dialog">
      {work.title}
    </button>
  );

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={work.src}
          alt={work.description || work.title}
          fill
          sizes={sizes ?? "(min-width: 1280px) 400px, (min-width: 640px) 45vw, 92vw"}
          className={styles.img}
        />
        {onOpen && (
          <span className={styles.expand} aria-hidden="true">
            <ExpandIcon size={18} />
          </span>
        )}
      </div>
      <div className={styles.body}>
        <Heading className={styles.title}>{trigger}</Heading>
        {work.category && <p className={styles.category}>{work.category}</p>}
      </div>
    </article>
  );
}
