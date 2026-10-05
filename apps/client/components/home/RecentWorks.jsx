"use client";

import styles from "./RecentWorks.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useRetryableList } from "@/hooks/useRetryableList";
import { fetchWorks } from "@/lib/api/fetchers";
import WorkCard from "@/components/portfolio/WorkCard";
import DataState from "@/components/common/DataState";

const COUNT = 3;

// Homepage preview of the newest portfolio items. Data comes from the
// server (ISR); the browser only fetches again if the visitor retries.
export default function RecentWorks({ initial }) {
  const { t, href } = useI18n();
  const { items, error, loading, retry } = useRetryableList(initial, () => fetchWorks());
  const works = items.slice(0, COUNT);

  if (error) return <DataState kind="error" message={t("works.error")} onRetry={retry} loading={loading} />;
  if (works.length === 0) return <DataState kind="empty" message={t("works.empty")} />;

  return (
    <ul className={styles.grid}>
      {works.map((work) => (
        <li key={work.id}>
          <WorkCard work={work} href={href("/portfolio")} sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 80vw" />
        </li>
      ))}
    </ul>
  );
}
