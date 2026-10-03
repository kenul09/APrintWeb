"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './SiteFooter.module.css';
import { useI18n } from '@/components/i18n/I18nProvider';
import { CONTACT, SOCIAL } from '@/data/contactInfo';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from './ContactIcons';

const PAGE_LINKS = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { href: '/products', key: 'nav.products' },
  { href: '/portfolio', key: 'nav.portfolio' },
  { href: '/contact', key: 'nav.contact' },
];

// Routes where the CTA block above the footer is hidden (/contact already is
// the CTA). Compared without a locale prefix, so /en/about and /ru/about match.
const HIDE_CTA_ROUTES = ['/contact', '/about'];
const LOCALE_PREFIX = /^\/(az|en|ru)(?=\/|$)/;

function stripLocale(pathname) {
  return pathname.replace(LOCALE_PREFIX, '') || '/';
}

// Footer "Əlaqə" rows. Values come from data/contactInfo.js (shared with the
// contact page); labels from i18n footer.labels.<key>. Rows without `href`
// are plain text.
const CONTACT_ROWS = [
  { key: 'phone', Icon: PhoneIcon, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { key: 'email', Icon: MailIcon, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { key: 'address', Icon: MapPinIcon, value: CONTACT.addressShort, href: CONTACT.mapsHref, external: true },
  { key: 'hours', Icon: ClockIcon, i18nValue: 'contact.hours' },
];

export default function SiteFooter() {
  const { t } = useI18n();
  const pathname = usePathname() || '/';
  const showCta = !HIDE_CTA_ROUTES.includes(stripLocale(pathname));
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

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

  const socials = [
    { href: SOCIAL.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: CONTACT.whatsappHref, label: 'WhatsApp', Icon: WhatsAppIcon },
    { href: SOCIAL.facebook, label: 'Facebook', Icon: FacebookIcon },
  ];

  return (
    <>
      {/* CTA — on every page except HIDE_CTA_ROUTES. */}
      {showCta && (
        <section className={`container ${styles.ctaWrap}`} aria-labelledby="footer-cta-title">
          <div className={styles.cta}>
            <h2 id="footer-cta-title" className={styles.ctaTitle}>
              <span>{t('footer.ctaLine1')}</span>
              <span className="accent-text">{t('footer.ctaLine2')}</span>
            </h2>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn-primary">{t('footer.ctaOrder')}</Link>
              <a href={CONTACT.whatsappHref} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className={styles.footer} role="contentinfo">
        <div className={`container ${styles.grid}`}>
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
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  className={styles.socialBtn}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.colPages} aria-labelledby="footer-pages-title">
            <h3 id="footer-pages-title" className={styles.colTitle}>{t('footer.pagesTitle')}</h3>
            <ul className={styles.list}>
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>{t(link.key)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.colContact}>
            <h3 className={styles.colTitle}>{t('footer.contactTitle')}</h3>
            <ul className={styles.contactList}>
              {CONTACT_ROWS.map(({ key, Icon, value, i18nValue, href, external }) => {
                const content = (
                  <>
                    <span className={styles.contactIcon}><Icon /></span>
                    <span>
                      <span className={styles.contactLabel}>{t(`footer.labels.${key}`)}</span>
                      <span className={styles.contactValue}>{i18nValue ? t(i18nValue) : value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={key}>
                    {href ? (
                      <a
                        href={href}
                        className={`${styles.contactRow} ${styles.contactLink}`}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={styles.contactRow}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="container">
          <div className={styles.bottom}>
            <span>{t('footer.copyright', { year })}</span>
            <span>{t('footer.madeBy')}</span>
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
    </>
  );
}
