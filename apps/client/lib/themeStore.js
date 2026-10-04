// Theme preference: "light", "dark" or "system" (follow the OS). Stored in
// localStorage; applied as data-theme on <html> for explicit choices and
// removed for "system", so CSS color-scheme falls back to the OS setting.
// The init script in app/[lang]/layout.js applies it before first paint.
export const THEMES = ["system", "light", "dark"];
const STORAGE_KEY = "theme";
const DEFAULT_THEME = "system";

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

let currentTheme = typeof window === "undefined" ? DEFAULT_THEME : readStoredTheme();
const listeners = new Set();

export function getSnapshot() {
  return currentTheme;
}

export function getServerSnapshot() {
  return DEFAULT_THEME;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setTheme(next) {
  if (!THEMES.includes(next) || next === currentTheme) return;
  currentTheme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable (private mode) — the choice lasts for this page.
  }

  const commit = () => {
    applyTheme(next);
    listeners.forEach((listener) => listener());
  };

  // Crossfade the whole page with the View Transitions API; fall back to an
  // instant switch where unsupported or when the user prefers less motion.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduceMotion) document.startViewTransition(commit);
  else commit();
}

export function cycleTheme() {
  setTheme(THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length]);
}
