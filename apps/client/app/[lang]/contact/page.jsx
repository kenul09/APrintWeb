import { Suspense } from "react";
import styles from "@/components/contact/ContactForm.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { metadataFor } from "@/lib/seo";
import { CONTACT } from "@/data/contactInfo";
import { ContactForm, ContactFormFromUrl } from "@/components/contact/ContactForm";
import MapFacade from "@/components/contact/MapFacade";
import ContactInfoList from "@/components/common/ContactInfoList";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons/Icons";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

export const generateMetadata = metadataFor("contact", "/contact");

export default async function Contact({ params }) {
  const { lang } = await params;
  const { t } = await getTranslator(lang);
  const newTab = t("common.opensInNewTab");

  const infoRows = [
    { key: "address", Icon: MapPinIcon, value: CONTACT.address, href: CONTACT.mapsHref, external: true },
    { key: "phone", Icon: PhoneIcon, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { key: "email", Icon: MailIcon, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { key: "hours", Icon: ClockIcon, value: t("contact.hours") },
  ];

  return (
    <>
      <section className="container page-hero">
        <p className="badge">{t("contact.badge")}</p>
        <h1>
          <span>{t("contact.heroLine1")}</span> <span className="accent-text">{t("contact.heroLine2")}</span>
        </h1>
        <p className="page-lead">{t("contact.heroText")}</p>
      </section>

      <div className={`container ${styles.grid}`}>
        <div className={styles.card}>
          {/* ?service=<slug> (from product pages) preselects the service. */}
          <Suspense fallback={<ContactForm />}>
            <ContactFormFromUrl />
          </Suspense>
        </div>

        <div className={styles.side}>
          <section className={styles.card} aria-labelledby="contact-info-title">
            <h2 id="contact-info-title" className={styles.infoTitle}>
              {t("contact.contactInfoTitle")}
            </h2>
            <ContactInfoList
              newTabLabel={newTab}
              rows={infoRows.map((row) => ({ ...row, label: t(`footer.labels.${row.key}`) }))}
            />
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className={`btn-secondary ${styles.whatsappButton}`}>
              <WhatsAppIcon />
              {t("contact.whatsappCta")}
              <span className="sr-only">{newTab}</span>
            </a>
          </section>

          <MapFacade />

          <section className={styles.card} aria-labelledby="quick-reply-title">
            <h2 id="quick-reply-title" className={styles.quickTitle}>
              {t("contact.quickReplyTitle")}
            </h2>
            <p className={styles.quickText}>{t("contact.quickReplyText")}</p>
          </section>
        </div>
      </div>
    </>
  );
}
