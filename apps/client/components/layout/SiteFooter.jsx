import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  // support multiple env var names: VITE_ADMIN_URL (requested), NEXT_PUBLIC_VITE_ADMIN_URL, NEXT_PUBLIC_ADMIN_URL
  const adminUrl = process.env.NEXT_PUBLIC_VITE_ADMIN_URL || process.env.VITE_ADMIN_URL || process.env.NEXT_PUBLIC_ADMIN_URL || '';

  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} A Print</span>
      {adminUrl ? (
        <a
          href={adminUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.adminLink}
          aria-label="Admin Giriş (opens in new tab)"
        >
          Admin Giriş
        </a>
      ) : null}
    </footer>
  );
}
