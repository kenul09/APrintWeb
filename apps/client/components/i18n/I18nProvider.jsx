"use client";

import { createContext, useContext } from "react";
import { createTranslator } from "@/i18n/translate";
import { localizePath } from "@/i18n/config";

const I18nContext = createContext(null);

// The language comes from the URL (/az, /en, /ru) and the dictionary is
// loaded on the server by app/[lang]/layout.js — nothing is persisted in
// the browser. Client islands read both from here.
export function I18nProvider({ lang, dict, children }) {
  const { t, tList } = createTranslator(dict);
  const href = (path) => localizePath(lang, path);

  return <I18nContext.Provider value={{ lang, t, tList, href }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
