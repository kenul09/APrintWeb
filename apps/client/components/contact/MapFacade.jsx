"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { CONTACT } from "@/data/contactInfo";
import { MapPinIcon } from "@/components/icons/Icons";

// Click-to-load Google Map: no third-party request (or cookies) until the
// visitor asks for it, which keeps the contact page fast.
export default function MapFacade() {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={styles.mapCard}>
        <iframe
          src={CONTACT.mapEmbedUrl}
          title={t("contact.map.title", { address: CONTACT.address })}
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.map}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.mapCard} ${styles.mapFacade}`}>
      <MapPinIcon size={28} className={styles.mapPin} />
      <p className={styles.mapAddress}>{CONTACT.address}</p>
      <div className={styles.mapActions}>
        <button type="button" className="btn-primary" onClick={() => setLoaded(true)}>
          {t("contact.map.show")}
        </button>
        <a href={CONTACT.mapsHref} className="btn-secondary" target="_blank" rel="noopener noreferrer">
          {t("contact.map.open")}
          <span className="sr-only">{t("common.opensInNewTab")}</span>
        </a>
      </div>
      <p className={styles.mapNote}>{t("contact.map.note")}</p>
    </div>
  );
}
