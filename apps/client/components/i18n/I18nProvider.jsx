"use client";

import { createContext, useContext, useSyncExternalStore } from 'react';
import { translations } from '@/i18n/translations';
import { getSnapshot, getServerSnapshot, subscribe, setLang as setStoredLang } from '@/lib/langStore';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  // Reads the persisted language from an external store (localStorage) via
  // useSyncExternalStore, rather than useState+useEffect — this avoids the
  // extra post-mount render and the setState-in-effect anti-pattern.
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLang = setStoredLang;

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
