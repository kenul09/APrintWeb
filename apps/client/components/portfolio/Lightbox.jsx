"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons/Icons";

// Modal image viewer built on <dialog>.showModal(): the browser makes the
// rest of the page inert (focus is trapped inside) and Escape closes it.
// ←/→ step through the list. Focus returns to the card that opened it.
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const { t } = useI18n();
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const open = index !== null;
  const work = open ? items[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleClose() {
    onClose();
    returnFocusRef.current?.focus?.();
  }

  function step(delta) {
    onNavigate((index + delta + items.length) % items.length);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="lightbox-title"
      aria-describedby={work?.description ? "lightbox-desc" : undefined}
      onClose={handleClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // Click on the backdrop (the dialog box itself, outside content).
        if (e.target === e.currentTarget) dialogRef.current.close();
      }}
    >
      {work && (
        <div className={styles.inner}>
          <div className={styles.media}>
            <Image key={work.id} src={work.src} alt={work.description || work.title} fill sizes="(min-width: 1024px) 70vw, 100vw" className={styles.img} />
          </div>
          <div className={styles.info}>
            <p className={styles.counter} aria-live="polite">
              {t("portfolio.counter", { current: index + 1, total: items.length })}
            </p>
            <h2 id="lightbox-title" className={styles.title}>
              {work.title}
            </h2>
            {work.category && <p className={styles.category}>{work.category}</p>}
            {work.description && (
              <p id="lightbox-desc" className={styles.description}>
                {work.description}
              </p>
            )}
          </div>

          <button type="button" className={`${styles.btn} ${styles.close}`} onClick={() => dialogRef.current.close()} aria-label={t("common.close")}>
            <CloseIcon />
          </button>
          {items.length > 1 && (
            <>
              <button type="button" className={`${styles.btn} ${styles.prev}`} onClick={() => step(-1)} aria-label={t("common.previous")}>
                <ChevronLeftIcon />
              </button>
              <button type="button" className={`${styles.btn} ${styles.next}`} onClick={() => step(1)} aria-label={t("common.next")}>
                <ChevronRightIcon />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
