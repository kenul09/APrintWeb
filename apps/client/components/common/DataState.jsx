"use client";

import styles from "./DataState.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { AlertIcon, RefreshIcon } from "@/components/icons/Icons";

// Visible error / empty state for API-backed sections. Errors are announced
// (role="alert") and always offer a retry; empty states are plain status.
export default function DataState({ kind, message, onRetry, loading = false }) {
  const { t } = useI18n();
  const isError = kind === "error";

  return (
    <div className={`${styles.box} ${isError ? styles.error : ""}`} role={isError ? "alert" : "status"}>
      {isError && <AlertIcon className={styles.icon} />}
      <p className={styles.message}>{message}</p>
      {isError && onRetry && (
        <button type="button" className="btn-secondary" onClick={onRetry} disabled={loading} aria-busy={loading}>
          <RefreshIcon size={18} className={loading ? styles.spin : undefined} />
          {loading ? t("common.retrying") : t("common.tryAgain")}
        </button>
      )}
    </div>
  );
}
