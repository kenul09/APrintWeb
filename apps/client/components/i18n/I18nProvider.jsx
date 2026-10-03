"use client";

import { createContext, useContext, useSyncExternalStore } from 'react';
import { translations } from '@/i18n/translations';
import { getSnapshot, getServerSnapshot, subscribe, setLang as setStoredLang } from '@/lib/langStore';

const I18nContext = createContext();

// Shared, stable fallback so hooks that depend on a list don't re-run on
// every render when a key is missing.
const EMPTY_LIST = Object.freeze([]);

export function I18nProvider({ children }) {
  // Reads the persisted language from an external store (localStorage) via
  // useSyncExternalStore, rather than useState+useEffect — this avoids the
  // extra post-mount render and the setState-in-effect anti-pattern.
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLang = setStoredLang;

  // Optional vars fill {name} placeholders in string values, e.g.
  // t('about.p1', { year: 2003 }).
  const t = (keyPath, vars) => {
    const parts = keyPath.split('.');
    let node = translations[lang] || translations['az'];
    for (const p of parts) {
      if (!node) return keyPath;
      node = node[p];
    }
    if (vars && typeof node === 'string') {
      return node.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
    }
    return node ?? keyPath;
  };

  // t() returns the raw value, so arrays come back as-is — but a missing key
  // falls back to the key string. Use tList() wherever the result is mapped
  // over, so a missing/mistyped list renders nothing instead of crashing.
  const tList = (keyPath) => {
    const value = t(keyPath);
    return Array.isArray(value) ? value : EMPTY_LIST;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tList }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
