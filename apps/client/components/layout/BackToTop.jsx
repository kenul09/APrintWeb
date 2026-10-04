"use client";

import { useEffect, useState } from "react";
import styles from "./SiteFooter.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ArrowUpIcon } from "@/components/icons/Icons";

export default function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move focus to the top as well, so keyboard users continue from there.
    document.getElementById("top")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      className={`${styles.backToTop} ${visible ? styles.visible : ""}`}
      onClick={toTop}
      aria-label={t("common.backToTop")}
      title={t("common.backToTop")}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : "true"}
    >
      <ArrowUpIcon />
    </button>
  );
}
