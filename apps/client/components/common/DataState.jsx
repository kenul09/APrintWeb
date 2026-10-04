"use client";

import Link from "next/link";
import styles from "./DataState.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { CONTACT } from "@/data/contactInfo";
import { AlertIcon, RefreshIcon } from "@/components/icons/Icons";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

// Visible "temporarily unavailable" / empty state for API-backed sections.
// The unavailable state is a polite status (not an alarm — the visitor did
// nothing wrong), offers a retry and points to WhatsApp and the contact
// page so the visitor can still reach us.
export default function DataState({ kind, message, onRetry, loading = false }) {
  const { t, href } = useI18n();
  const unavailable = kind === "error";

  return (
    <div className={`${styles.box} ${unavailable ? styles.error : ""}`} role="status">
      {unavailable && <AlertIcon className={styles.icon} />}
      <div className={styles.text}>
        <p className={styles.message}>{message}</p>
        {unavailable && <p className={styles.help}>{t("common.unavailableHelp")}</p>}
      </div>
      {unavailable && (
        <div className={styles.actions}>
          {onRetry && (
            <button type="button" className="btn-secondary" onClick={onRetry} disabled={loading} aria-busy={loading}>
              <RefreshIcon size={18} className={loading ? styles.spin : undefined} />
              {loading ? t("common.retrying") : t("common.tryAgain")}
            </button>
          )}
          <a href={CONTACT.whatsappHref} className="btn-secondary" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {t("mobileBar.whatsapp")}
            <span className="sr-only">{t("common.opensInNewTab")}</span>
          </a>
          <Link href={href("/contact")} className="btn-ghost">
            {t("nav.contact")}
          </Link>
        </div>
      )}
    </div>
  );
}
