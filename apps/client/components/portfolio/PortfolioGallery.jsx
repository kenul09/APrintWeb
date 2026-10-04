"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./PortfolioGallery.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useRetryableList } from "@/hooks/useRetryableList";
import { portfolioService } from "@/lib/api/portfolioService";
import { normalizeWorks } from "@/lib/normalize";
import DataState from "@/components/common/DataState";
import WorkCard from "./WorkCard";
import Lightbox from "./Lightbox";

const PAGE_SIZE = 9;
// Stable value for "every category" — never the translated label.
const ALL = "all";

// Filter (?category=…), one grid with "Show more" (same on every screen
// size) and a lightbox. `category` comes from the URL via the wrapper below.
export function PortfolioGallery({ initial, category = ALL }) {
  const { t } = useI18n();
  const { items, error, loading, retry } = useRetryableList(initial, async () =>
    normalizeWorks(await portfolioService.getAll())
  );
  const [shown, setShown] = useState({ category, count: PAGE_SIZE });
  const [openIndex, setOpenIndex] = useState(null);
  const gridRef = useRef(null);

  const categories = [...new Set(items.map((w) => w.category).filter(Boolean))];
  const active = category === ALL || categories.includes(category) ? category : ALL;
  const filtered = active === ALL ? items : items.filter((w) => w.category === active);
  // Changing the filter resets the page size without an effect.
  const count = shown.category === active ? shown.count : PAGE_SIZE;
  const visible = filtered.slice(0, count);

  function selectCategory(next) {
    const params = new URLSearchParams(window.location.search);
    if (next === ALL) params.delete("category");
    else params.set("category", next);
    const query = params.toString();
    // Native history update — Next.js syncs useSearchParams, no server trip.
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    setShown({ category: next, count: PAGE_SIZE });
  }

  function showMore() {
    const firstNew = count;
    setShown({ category: active, count: count + PAGE_SIZE });
    // Move focus to the first newly shown card so keyboard users continue
    // where the new content starts.
    requestAnimationFrame(() => gridRef.current?.querySelectorAll("li")[firstNew]?.querySelector("a, button")?.focus());
  }

  if (error) return <DataState kind="error" message={t("portfolio.error")} onRetry={retry} loading={loading} />;
  if (items.length === 0) return <DataState kind="empty" message={t("portfolio.empty")} />;

  return (
    <>
      {categories.length > 1 && (
        <div className={styles.filters} role="group" aria-label={t("portfolio.filterLabel")}>
          {[ALL, ...categories].map((value) => (
            <button
              key={value}
              type="button"
              className={styles.filter}
              aria-pressed={active === value}
              onClick={() => selectCategory(value)}
            >
              {value === ALL ? t("portfolio.all") : value}
            </button>
          ))}
        </div>
      )}

      <ul ref={gridRef} className={styles.grid}>
        {visible.map((work, i) => (
          <li key={work.id}>
            <WorkCard work={work} eager={i < 3} headingLevel="h2" onOpen={() => setOpenIndex(i)} openLabel={t("portfolio.openImage", { title: work.title })} />
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className={styles.count} aria-live="polite">
          {t("common.shownOf", { shown: visible.length, total: filtered.length })}
        </p>
        {visible.length < filtered.length && (
          <button type="button" className="btn-secondary" onClick={showMore}>
            {t("common.showMore")}
          </button>
        )}
      </div>

      <Lightbox items={visible} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}

export function PortfolioGalleryFromUrl({ initial }) {
  const category = useSearchParams().get("category") ?? ALL;
  return <PortfolioGallery initial={initial} category={category} />;
}
