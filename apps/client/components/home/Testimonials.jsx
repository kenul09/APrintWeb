import styles from "./Testimonials.module.css";
import { testimonials } from "@/data/testimonials";
import { QuoteIcon } from "@/components/icons/Icons";

// Renders nothing until data/testimonials.js has real entries.
export default function Testimonials({ lang, t }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="container section reveal" aria-labelledby="testimonials-title">
      <div className="section-head">
        <div>
          <h2 id="testimonials-title">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
        </div>
      </div>
      <ul className={styles.grid}>
        {testimonials.map((item) => (
          <li key={item.id} className={styles.item}>
            <figure className={styles.card}>
              <QuoteIcon className={styles.icon} />
              <blockquote className={styles.quote}>
                <p>{item.quote[lang] ?? item.quote.az}</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.name}>{item.name}</span>
                {item.company && <span className={styles.company}>{item.company}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
