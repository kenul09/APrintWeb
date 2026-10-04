"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./LanguageSwitcher.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { locales, localizePath, stripLocale } from "@/i18n/config";
import { ChevronDownIcon, GlobeIcon } from "@/components/icons/Icons";

// Disclosure of plain links (/az/…, /en/…, /ru/…) — switching language is
// navigation, so these are links, not menu items. Each language is named in
// its own language. Arrow keys move between options; Escape closes.
export default function LanguageSwitcher({ variant = "dropdown" }) {
  const { lang, t } = useI18n();
  const pathname = usePathname() || "/";
  const path = stripLocale(pathname);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const names = t("common.langNames");

  const options = locales.map((code) => (
    <li key={code}>
      {/* A plain <a> on purpose: switching language changes the root
          layout's [lang] param, and a client-side transition would
          re-render <html>/<head> scripts (theme init, JSON-LD) on the client,
          which React warns about. A document navigation also resets every
          translated string and the metadata in one go. */}
      <a
        href={localizePath(code, path)}
        hrefLang={code}
        lang={code}
        aria-current={code === lang ? "true" : undefined}
        className={styles.option}
      >
        <span>{names[code]}</span>
        <span className={styles.code} aria-hidden="true">
          {code.toUpperCase()}
        </span>
      </a>
    </li>
  ));

  useEffect(() => {
    if (!open) return undefined;
    function onPointer(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onListKeyDown(e) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const links = [...e.currentTarget.querySelectorAll("a")];
    const index = links.indexOf(document.activeElement);
    const last = links.length - 1;
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? last : e.key === "ArrowDown" ? (index + 1) % links.length : (index - 1 + links.length) % links.length;
    e.preventDefault();
    links[next]?.focus();
  }

  // Inline variant (mobile menu): always-visible list, no disclosure.
  if (variant === "inline") {
    return (
      <nav aria-label={t("common.language")}>
        <ul className={styles.inlineList}>{options}</ul>
      </nav>
    );
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => document.getElementById(listId)?.querySelector("a")?.focus());
          }
        }}
      >
        <GlobeIcon size={18} />
        <span aria-hidden="true">{lang.toUpperCase()}</span>
        <span className="sr-only">{t("common.languageCurrent", { name: names[lang] })}</span>
        <ChevronDownIcon size={16} className={styles.chevron} />
      </button>
      <ul id={listId} className={styles.list} hidden={!open} onKeyDown={onListKeyDown}>
        {options}
      </ul>
    </div>
  );
}
