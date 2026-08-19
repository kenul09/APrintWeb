"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './LanguageSelector.module.css';
import { useI18n } from '@/components/i18n/I18nProvider';

const FLAGS = { az: '🇦🇿', en: '🇬🇧', ru: '🇷🇺' };

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  function toggle() { setOpen((v) => !v); }
  function choose(code) { setLang(code); setOpen(false); }

  return (
    <div className={styles.selector} ref={rootRef}>
      <button aria-haspopup="listbox" aria-expanded={open} onClick={toggle} className={styles.button}>
        <span style={{ fontSize: 18 }}>{FLAGS[lang]}</span>
        <span style={{ fontSize: 12, opacity: 0.95 }}>{lang.toUpperCase()}</span>
        <span className={`${styles.chev} ${open ? 'open' : ''}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div role="listbox" className={styles.dropdown} tabIndex={-1}>
          {['az', 'en', 'ru'].map((code) => (
            <div
              key={code}
              role="option"
              aria-selected={lang === code}
              className={`${styles.item} ${lang === code ? styles.selected : ''}`}
              onClick={() => choose(code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  choose(code);
                }
              }}
            >
              <div className="left">
                <span style={{ fontSize: 18 }}>{FLAGS[code]}</span>
                <span>{t(`langNames.${code}`)}</span>
              </div>
              <div className="right">{code.toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
