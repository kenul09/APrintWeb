"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '@/i18n/translations';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  // Start with a deterministic default to keep SSR and client initial render identical.
  // Do not read localStorage during render — read it after mount and update state if needed.
  const [lang, setLang] = useState('az');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved && saved !== lang) setLang(saved);
    } catch (e) {
      // ignore
    }
  // run only once on mount
  }, []);

  // persist language changes to localStorage
  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }, [lang]);

  const t = (keyPath) => {
    const parts = keyPath.split('.');
    let node = translations[lang] || translations['az'];
    for (const p of parts) {
      if (!node) return keyPath;
      node = node[p];
    }
    return node ?? keyPath;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
