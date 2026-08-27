"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './LanguageSelector.module.css';
import { useI18n } from '@/components/i18n/I18nProvider';

const LANGUAGES = [
  { code: 'az', flag: '🇦🇿' },
  { code: 'en', flag: '🇬🇧' },
  { code: 'ru', flag: '🇷🇺' },
];

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return undefined;

    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function choose(code) {
    setLang(code);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className={styles.selector} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Select language, current: ${current.code.toUpperCase()}`}
        onClick={() => setOpen((v) => !v)}
        className={styles.trigger}
      >
        <span className={styles.flag} aria-hidden="true">{current.flag}</span>
        <span className={styles.code}>{current.code.toUpperCase()}</span>
        <svg
          className={`${styles.chev} ${open ? styles.chevOpen : ''}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`}
        role="menu"
        aria-label="Select language"
      >
        {LANGUAGES.map(({ code, flag }) => (
          <button
            key={code}
            type="button"
            role="menuitemradio"
            aria-checked={lang === code}
            tabIndex={open ? 0 : -1}
            className={`${styles.item} ${lang === code ? styles.itemActive : ''}`}
            onClick={() => choose(code)}
          >
            <span className={styles.itemLeft}>
              <span className={styles.flag} aria-hidden="true">{flag}</span>
              <span className={styles.itemName}>{t(`langNames.${code}`)}</span>
            </span>
            <span className={styles.itemCode}>{code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
