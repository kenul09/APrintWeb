"use client";

import { useEffect } from "react";
import styles from "./status.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { RefreshIcon } from "@/components/icons/Icons";

export default function Error({ error, retry }) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={`container ${styles.wrap}`}>
      <h1>{t("error.title")}</h1>
      <p className={styles.text}>{t("error.text")}</p>
      <button type="button" onClick={() => retry()} className="btn-primary">
        <RefreshIcon size={18} />
        {t("common.tryAgain")}
      </button>
    </section>
  );
}
