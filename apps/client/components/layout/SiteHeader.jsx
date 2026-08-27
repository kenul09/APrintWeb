"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import styles from "./SiteHeader.module.css";
import { useI18n } from '@/components/i18n/I18nProvider';
import LanguageSelector from './LanguageSelector';
import AdminLoginButton from './AdminLoginButton';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: "/", label: t('nav.home') },
    { href: "/about", label: t('nav.about') },
    { href: "/products", label: t('nav.products') },
    { href: "/portfolio", label: t('nav.portfolio') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="A Print home">
          <Image
            src="/logos/aprint-logo.png"
            alt="APrint"
            width={140}
            height={47}
            className={styles.logo}
            preload
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={`${styles.link} ${isActive?styles.active:''}`}>
                {item.label}
              </Link>
            );
          })}

          <div className={styles.controls}>
            <LanguageSelector />
            <AdminLoginButton />
          </div>
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
        aria-label="Mobil naviqasiya"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}

        <div className={styles.mobileControls}>
          <LanguageSelector />
          <AdminLoginButton />
        </div>
      </nav>
    </header>
  );
}
