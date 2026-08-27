"use client";

import styles from './ThemeToggle.module.css';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function ThemeToggle() {
  const ctx = useTheme();
  const theme = ctx?.theme ?? 'dark';
  const toggleTheme = ctx?.toggleTheme ?? (() => {});
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`${styles.icon} ${!isDark ? styles.iconActive : ''}`} aria-hidden="true">☀</span>
      <span className={styles.thumb} aria-hidden="true" />
      <span className={`${styles.icon} ${isDark ? styles.iconActive : ''}`} aria-hidden="true">☾</span>
    </button>
  );
}
