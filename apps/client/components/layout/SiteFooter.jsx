import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { localizePath } from "@/i18n/config";
import { CONTACT, SOCIAL } from "@/data/contactInfo";
import Logo from "@/components/brand/Logo";
import BackToTop from "./BackToTop";
import ContactInfoList from "@/components/common/ContactInfoList";
import { NAV_ITEMS } from "./navItems";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons/Icons";

const CONTACT_ROWS = [
  { key: "phone", Icon: PhoneIcon, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { key: "email", Icon: MailIcon, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { key: "address", Icon: MapPinIcon, value: CONTACT.addressShort, href: CONTACT.mapsHref, external: true },
  { key: "hours", Icon: ClockIcon, i18nValue: "contact.hours" },
];

const SOCIALS = [
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: CONTACT.whatsappHref, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
];

export default async function SiteFooter({ lang }) {
  const { t } = await getTranslator(lang);
  const year = new Date().getFullYear();
  const newTab = t("common.opensInNewTab");

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.colBrand}>
          <Link href={localizePath(lang, "/")} className={styles.brand} aria-label={t("common.homeLabel")}>
            <Logo className={styles.logo} />
          </Link>
          <p className={styles.desc}>{t("footer.desc")}</p>
          <h2 className="sr-only">{t("footer.socialTitle")}</h2>
          <ul className={styles.socialRow}>
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a className={styles.socialBtn} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} ${newTab}`}>
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-pages-title">
          <h2 id="footer-pages-title" className={styles.colTitle}>
            {t("footer.pagesTitle")}
          </h2>
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link href={localizePath(lang, item.path)} className={styles.link}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.colTitle}>{t("footer.contactTitle")}</h2>
          <ContactInfoList
            compact
            newTabLabel={newTab}
            rows={CONTACT_ROWS.map(({ i18nValue, ...row }) => ({
              ...row,
              label: t(`footer.labels.${row.key}`),
              value: i18nValue ? t(i18nValue) : row.value,
            }))}
          />
        </div>
      </div>

      <div className="container">
        <div className={styles.bottom}>
          <span>{t("footer.copyright", { year })}</span>
          <span>{t("footer.madeBy")}</span>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
