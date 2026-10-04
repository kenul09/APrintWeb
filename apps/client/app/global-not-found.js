import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./[lang]/status.module.css";
import az from "@/i18n/dictionaries/az";
import en from "@/i18n/dictionaries/en";
import ru from "@/i18n/dictionaries/ru";
import { themeInitScript } from "@/lib/themeStore";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext", "cyrillic"], display: "swap" });

export const metadata = {
  title: `404 — ${az.notFound.title}`,
};

// Fallback for URLs that match no route at all. proxy.js redirects almost
// everything to a localized path first, so this is rarely reached; it has no
// locale, so it speaks all three languages.
export default function GlobalNotFound() {
  return (
    <html lang="az" className={inter.variable} suppressHydrationWarning>
      <body>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <main className={`container ${styles.wrap}`}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <h1>{az.notFound.title}</h1>
          <p className={styles.text}>
            <span lang="en">{en.notFound.title}</span> · <span lang="ru">{ru.notFound.title}</span>
          </p>
          <Link href="/az" className="btn-primary">
            {az.notFound.cta}
          </Link>
        </main>
      </body>
    </html>
  );
}
