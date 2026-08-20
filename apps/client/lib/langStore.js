const STORAGE_KEY = 'lang';
const DEFAULT_LANG = 'az';

let currentLang = DEFAULT_LANG;
const listeners = new Set();

export function getSnapshot() {
  return currentLang;
}

export function getServerSnapshot() {
  return DEFAULT_LANG;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLang(next) {
  if (next === currentLang) return;
  currentLang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
  listeners.forEach((listener) => listener());
}

// Runs once on module load, client-side only, to hydrate from a previous visit.
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) currentLang = saved;
  } catch {
    // ignore
  }
}
