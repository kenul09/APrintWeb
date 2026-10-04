"use client";

import { useSyncExternalStore } from "react";
import { cycleTheme, getServerSnapshot, getSnapshot, setTheme, subscribe } from "@/lib/themeStore";

// Reads the persisted theme from lib/themeStore via useSyncExternalStore —
// no context provider is needed, any client component can call this.
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { theme, setTheme, cycleTheme };
}
