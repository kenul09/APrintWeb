import Link from "next/link";
import styles from "./CtaBlock.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { localizePath } from "@/i18n/config";
import { CONTACT } from "@/data/contactInfo";
import { ArrowRightIcon } from "@/components/icons/Icons";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

// "Have a project? Let's talk." block shown above the footer on every page
// except /contact (which already is the call to action).
export default async function CtaBlock({ lang }) {
  const { t } = await getTranslator(lang);

  return (
    <section className={`container section reveal ${styles.wrap}`} aria-labelledby="cta-title">
      <div className={styles.cta}>
        <h2 id="cta-title" className={styles.title}>
          <span>{t("cta.line1")}</span> <span className="accent-text">{t("cta.line2")}</span>
        </h2>
        <div className={styles.actions}>
          <Link href={localizePath(lang, "/contact")} className="btn-primary">
            {t("cta.order")}
            <ArrowRightIcon size={18} />
          </Link>
          <a href={CONTACT.whatsappHref} className="btn-secondary" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {t("cta.whatsapp")}
            <span className="sr-only">{t("common.opensInNewTab")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
