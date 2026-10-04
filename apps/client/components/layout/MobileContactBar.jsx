import styles from "./MobileContactBar.module.css";
import { CONTACT } from "@/data/contactInfo";
import { PhoneIcon } from "@/components/icons/Icons";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

// Sticky "Call / WhatsApp" bar, phones only (≤768px). body gets matching
// bottom padding (--mobile-bar-height) so it never covers the footer.
export default function MobileContactBar({ t }) {
  return (
    <nav className={styles.bar} aria-label={t("mobileBar.label")}>
      <a href={CONTACT.phoneHref} className={styles.action}>
        <PhoneIcon />
        {t("mobileBar.call")}
      </a>
      <a href={CONTACT.whatsappHref} className={`${styles.action} ${styles.whatsapp}`} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={20} />
        {t("mobileBar.whatsapp")}
        <span className="sr-only">{t("common.opensInNewTab")}</span>
      </a>
    </nav>
  );
}
