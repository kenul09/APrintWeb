"use client";

import styles from './AdminLoginButton.module.css';
import { getAdminUrl } from '@/lib/adminUrl';
import { useRouter } from 'next/navigation';

export default function AdminLoginButton() {
  const adminUrl = getAdminUrl();
  const router = useRouter();

  // In development, apps/admin (Vite) runs on the port set in
  // apps/admin/vite.config.js. In production there is no safe localhost
  // fallback — NEXT_PUBLIC_ADMIN_URL must be configured to the deployed
  // admin URL, otherwise the button is hidden (see render guard below).
  const isDev = process.env.NODE_ENV === 'development';
  const devFallbackUrl = 'http://localhost:5178/admin';

  if (!adminUrl && !isDev) {
    return null;
  }

  function go() {
    // Determine final target. If an explicit adminUrl is provided, prefer it
    let target = adminUrl || '';
    if (target) {
      // strip trailing slash
      target = target.replace(/\/$/, '');
      // if it already includes /admin path, use as-is; otherwise append /admin
      try {
        const url = new URL(target);
        if (!url.pathname || url.pathname === '/') {
          target = `${target}/admin`;
        } else if (!url.pathname.includes('/admin')) {
          target = `${target.replace(/\/$/, '')}/admin`;
        }
      } catch (e) {
        // not a full URL, if it's a relative path just use it
        if (!target.startsWith('/')) target = `/${target}`;
      }
    } else {
      // No NEXT_PUBLIC_ADMIN_URL configured — only reached in development
      // (see render guard above), so fall back to the local Vite dev port.
      target = devFallbackUrl;
    }

    // If target looks like an absolute URL, perform a full navigation; otherwise use router.push
    try {
      if (/^https?:\/\//i.test(target)) {
        window.location.href = target;
      } else {
        router.push(target);
      }
    } catch (e) {
      window.location.href = target;
    }
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
