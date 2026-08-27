"use client";

import { createContext, useContext, useSyncExternalStore } from 'react';
import {
  getSnapshot,
  getServerSnapshot,
  subscribe,
  setTheme as setStoredTheme,
  toggleTheme as toggleStoredTheme,
} from '@/lib/themeStore';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Mirrors I18nProvider: reads the persisted theme from an external store
  // (localStorage + the data-theme attribute set by the anti-flash inline
  // script in app/layout.js) via useSyncExternalStore.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setStoredTheme, toggleTheme: toggleStoredTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
