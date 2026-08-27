"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './SiteFooter.module.css';
import { useI18n } from '@/components/i18n/I18nProvider';
import { useEffect, useState } from 'react';

export default function SiteFooter() {
  const { t } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTop() {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0,0); }
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.colBrand}>
            <Link href="/" className={styles.brand} aria-label="A Print home">
              <Image
                src="/logos/aprint-logo.png"
                alt="APrint"
                width={140}
                height={47}
                className={styles.logo}
              />
            </Link>
            <p className={styles.desc}>{t('footer.desc')}</p>
            <div className={styles.socialRow}>
              <a className={styles.socialBtn} href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
              <a className={styles.socialBtn} href="https://wa.me/994557505533" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a className={styles.socialBtn} href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
          {/* Empty div for spacing on the right side */}
          <div />
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span>{t('footer.copyright')}</span>
        </div>
      </div>

      {/* Back to top */}
      <button
        className={`${styles.backToTop} ${showTop ? styles.visible : ''}`}
        onClick={scrollTop}
        aria-label={t('footer.backToTop')}
        title={t('footer.backToTop')}
      >
        ↑
      </button>
    </footer>
  );
}
