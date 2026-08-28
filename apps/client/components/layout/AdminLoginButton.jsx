"use client";

import styles from './AdminLoginButton.module.css';
import { getAdminUrl } from '@/lib/adminUrl';

// apps/admin is a separate Vercel deployment — this is a plain external
// navigation, never Next.js routing. Falls back to the known production
// admin URL if NEXT_PUBLIC_ADMIN_URL isn't configured, so the button always
// works instead of silently disappearing when the env var is missing.
const ADMIN_URL_FALLBACK = 'https://a-print-web-admin.vercel.app';

export default function AdminLoginButton() {
  const adminUrl = getAdminUrl() || ADMIN_URL_FALLBACK;

  function go() {
    window.location.href = adminUrl;
  }

  return (
    <button
      className={styles.btn}
      onClick={go}
      aria-label="Admin Giriş"
      title="Admin Giriş"
    >
      <span className={styles.lock}>🔒</span>
      <span className={styles.label}>Admin Giriş</span>
    </button>
  );
}
