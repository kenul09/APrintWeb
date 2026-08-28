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
    if (typeof window !== 'undefined') {
      console.error(
        '[client] NEXT_PUBLIC_ADMIN_URL is not set, so the Admin Giriş button is hidden (there is no safe ' +
          "localhost fallback in production). Set NEXT_PUBLIC_ADMIN_URL to the deployed apps/admin URL in " +
          "this project's Vercel environment variables and redeploy."
      );
    }
    return null;
  }

  function go() {
    // NEXT_PUBLIC_ADMIN_URL is the full, complete destination for the
    // separate apps/admin deployment — navigate to it exactly as configured.
    // Do NOT append "/admin" here: that used to turn a bare domain into
    // "<domain>/admin", which is harmless when the domain is the actual
    // admin app (its own router redirects "/" -> "/admin" internally) but
    // silently produces a broken same-origin "/admin" route if
    // NEXT_PUBLIC_ADMIN_URL is ever misconfigured to the client's own domain.
    const target = (adminUrl || devFallbackUrl).replace(/\/$/, '');

    if (/^https?:\/\//i.test(target)) {
      window.location.href = target;
    } else {
      router.push(target.startsWith('/') ? target : `/${target}`);
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
