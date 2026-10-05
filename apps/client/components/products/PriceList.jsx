"use client";

import styles from "./PriceList.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { useRetryableList } from "@/hooks/useRetryableList";
import { fetchProducts } from "@/lib/api/fetchers";
import DataState from "@/components/common/DataState";

// Active products and prices from the API (server-loaded, ISR). Failures
// and an empty list are shown to the visitor, never hidden.
export default function PriceList({ initial }) {
  const { t } = useI18n();
  const { items, error, loading, retry } = useRetryableList(initial, () => fetchProducts());

  if (error) return <DataState kind="error" message={t("products.priceError")} onRetry={retry} loading={loading} />;
  if (items.length === 0) return <DataState kind="empty" message={t("products.priceEmpty")} />;

  return (
    <ul className={styles.grid}>
      {items.map((product) => (
        <li key={product.id} className={styles.item}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.price}>{product.price || t("products.priceOnRequest")}</span>
        </li>
      ))}
    </ul>
  );
}
