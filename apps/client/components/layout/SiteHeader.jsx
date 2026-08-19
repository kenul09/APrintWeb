import Link from "next/link";
import styles from "./SiteHeader.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="A Print home">
          A <span>Print</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
