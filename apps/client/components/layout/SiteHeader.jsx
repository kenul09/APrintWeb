"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { stripLocale } from "@/i18n/config";
import Logo from "@/components/brand/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS, isActivePath } from "./navItems";
import { CloseIcon, MenuIcon } from "@/components/icons/Icons";

export default function SiteHeader() {
  const { t, href } = useI18n();
  const pathname = usePathname() || "/";
  const current = stripLocale(pathname);

  // The menu remembers the path it was opened on, so any route change
  // closes it without a setState-in-effect.
  const [openPath, setOpenPath] = useState(null);
  const menuOpen = openPath === pathname;
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenPath(null);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const links = (className) =>
    NAV_ITEMS.map((item) => {
      const active = isActivePath(current, item.path);
      return (
        <li key={item.path}>
          <Link href={href(item.path)} className={className} aria-current={active ? "page" : undefined}>
            {t(item.key)}
          </Link>
        </li>
      );
    });

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={href("/")} className={styles.brand} aria-label={t("common.homeLabel")}>
          <Logo className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label={t("common.mainNav")}>
          <ul className={styles.navList}>{links(styles.link)}</ul>
        </nav>

        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? t("common.menuClose") : t("common.menuOpen")}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setOpenPath(menuOpen ? null : pathname)}
        >
          {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      <div id="mobile-nav" className={styles.mobilePanel} hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label={t("common.mobileNav")}>
          <ul className={styles.mobileList}>{links(styles.mobileLink)}</ul>
        </nav>
        <div className={styles.mobileControls}>
          <LanguageSwitcher variant="inline" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
