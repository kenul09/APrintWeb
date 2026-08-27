const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'dark';

function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

// The inline script in app/layout.js already sets data-theme on <html>
// synchronously before hydration (to avoid a flash of the wrong theme), so
// on the client we just read that attribute back rather than recomputing it.
function readInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME;
}

let currentTheme = readInitialTheme();
const listeners = new Set();

if (typeof window !== 'undefined') {
  applyTheme(currentTheme);
}

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
  if (next !== 'light' && next !== 'dark') return;
  if (next === currentTheme) return;
  currentTheme = next;
  applyTheme(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
