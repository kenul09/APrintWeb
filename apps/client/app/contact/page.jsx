"use client";

import { useState, useSyncExternalStore } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./contact.module.css";
import { useI18n } from '@/components/i18n/I18nProvider';
import { contactService } from "@/lib/api/contactService";
import { CONTACT } from "@/data/contactInfo";
import { categoryGroups } from "@/data/products";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/layout/ContactIcons";
import { WhatsAppIcon } from "@/components/layout/BrandIcons";

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`;

const AZ_LETTERS = { ə: "e", ı: "i", ş: "s", ç: "c", ğ: "g", ö: "o", ü: "u" };

// "Mətbəə" → "metbee" — used for ?category=<slug> preselects.
function slugify(value) {
  return String(value)
    .toLocaleLowerCase("az")
    .replace(/[əışçğöü]/g, (ch) => AZ_LETTERS[ch])
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Service options = the product categories on /products, plus "Digər".
const CATEGORY_OPTIONS = categoryGroups.map((group) => ({ value: slugify(group.title), label: group.title }));
const OTHER_VALUE = "diger";

// service: null = not chosen by the visitor yet (falls back to ?category=).
const EMPTY_FORM = { name: "", email: "", phone: "", service: null, message: "" };

// ?category=<slug> (e.g. /contact?category=metbee) → a known option value.
// Read via useSyncExternalStore: "" on the server, the real query string in
// the browser — no Suspense boundary and no setState-in-effect needed.
const noopSubscribe = () => () => {};
function useCategoryParam() {
  const search = useSyncExternalStore(noopSubscribe, () => window.location.search, () => "");
  const requested = new URLSearchParams(search).get("category");
  if (!requested) return "";
  const slug = slugify(requested);
  return slug === OTHER_VALUE || CATEGORY_OPTIONS.some((option) => option.value === slug) ? slug : "";
}

// Azerbaijani numbers: +994 XX XXX XX XX, 994XXXXXXXXX, 0XX XXX XX XX or
// XX XXX XX XX — spaces, dashes, dots and parentheses are ignored.
function isValidAzPhone(value) {
  const compact = value.replace(/[\s\-().]/g, "");
  return /^(\+?994\d{9}|0\d{9}|\d{9})$/.test(compact);
}

function validate(form, t) {
  const errors = {};
  if (!form.name.trim()) errors.name = t('contact.errors.nameRequired');
  // Email is required because the backend (apps/backend contact.schema.ts)
  // rejects messages without a valid email.
  if (!form.email.trim()) errors.email = t('contact.errors.emailRequired');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = t('contact.errors.emailInvalid');
  if (!form.phone.trim()) errors.phone = t('contact.errors.phoneRequired');
  else if (!isValidAzPhone(form.phone)) errors.phone = t('contact.errors.phoneInvalid');
  if (!form.message.trim()) errors.message = t('contact.errors.messageRequired');
  return errors;
}

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [heroRef, heroIn] = useInView(0.1);
  const [formRef, formIn] = useInView(0.1);
  const [infoRef, infoIn] = useInView(0.1);
  const categoryParam = useCategoryParam();
  const service = form.service ?? categoryParam;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "failed") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(form, t);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const serviceLabel =
      service === OTHER_VALUE
        ? t('contact.serviceOther')
        : CATEGORY_OPTIONS.find((option) => option.value === service)?.label;

    setStatus("sending");
    try {
      await contactService.create({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        ...(serviceLabel ? { service: serviceLabel } : {}),
      });
      setStatus("sent");
    } catch (error) {
      // Never show the raw error to visitors.
      console.warn("[Contact] Message could not be sent:", error);
      setStatus("failed");
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
  };

  const field = (key, { type = "text", required = false, multiline = false } = {}) => {
    const id = `contact-${key}`;
    const errorId = `${id}-error`;
    const common = {
      id,
      name: key,
      value: form[key],
      placeholder: t(`contact.placeholders.${key}`),
      onChange: (e) => handleChange(key, e.target.value),
      className: styles.input,
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? errorId : undefined,
      required,
    };
    return (
      <div className={styles.fieldWrap}>
        <label htmlFor={id} className={styles.fieldLabel}>
          {t(`contact.labels.${key}`)}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
        {multiline ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}
        {errors[key] && (
          <p id={errorId} className={styles.fieldError}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  const infoRows = [
    { key: "address", Icon: MapPinIcon, value: CONTACT.address, href: CONTACT.mapsHref, external: true },
    { key: "phone", Icon: PhoneIcon, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { key: "email", Icon: MailIcon, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { key: "hours", Icon: ClockIcon, value: t('contact.hours') },
  ];

  return (
    <div className={styles.pageShell}>
      <div className={styles.contactWrap}>
        <section
          ref={heroRef}
          className={styles.contactHero}
          style={{
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true">●</span>
            <span>{t('contact.badge')}</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span>{t('contact.heroLine1')}</span>
            <span className="accent-text">{t('contact.heroLine2')}</span>
          </h1>

          <p className={styles.heroText}>{t('contact.heroText')}</p>
        </section>

        <div className={styles.contactGrid}>
          <div
            ref={formRef}
            className={`${styles.card} ${styles.formCard}`}
            style={{
              opacity: formIn ? 1 : 0,
              transform: formIn ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            {status === "sent" ? (
              <div className={styles.successWrap} role="status">
                <div className={styles.successBadge} aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className={styles.successText}>{t('contact.successText')}</p>
                <button type="button" className={styles.newMessage} onClick={resetForm}>
                  {t('contact.newMessage')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {field("name", { required: true })}
                {field("email", { type: "email", required: true })}
                {field("phone", { type: "tel", required: true })}

                <div className={styles.fieldWrap}>
                  <label htmlFor="contact-service" className={styles.fieldLabel}>
                    {t('contact.labels.service')}
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    className={`${styles.input} ${service ? "" : styles.selectPlaceholder}`}
                  >
                    <option value="">{t('contact.servicePlaceholder')}</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    <option value={OTHER_VALUE}>{t('contact.serviceOther')}</option>
                  </select>
                </div>

                {field("message", { required: true, multiline: true })}

                {status === "failed" && (
                  <div className={styles.errorBox} role="alert">
                    {t('contact.errors.submitFailed')}
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn-primary ${styles.submitButton}`}
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" && <span className={styles.spinner} aria-hidden="true" />}
                  {status === "sending" ? t('contact.submitting') : t('contact.submit')}
                </button>
              </form>
            )}
          </div>

          <div
            ref={infoRef}
            className={styles.sideColumn}
            style={{
              opacity: infoIn ? 1 : 0,
              transform: infoIn ? "translateX(0)" : "translateX(40px)",
            }}
          >
            <div className={styles.card}>
              <h2 className={styles.infoTitle}>{t('contact.contactInfoTitle')}</h2>

              <ul className={styles.infoList}>
                {infoRows.map(({ key, Icon, value, href, external }) => {
                  const content = (
                    <>
                      <span className={styles.infoIcon}><Icon /></span>
                      <span>
                        <span className={styles.infoLabel}>{t(`footer.labels.${key}`)}</span>
                        <span className={styles.infoValue}>{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={key}>
                      {href ? (
                        <a
                          href={href}
                          className={`${styles.infoRow} ${styles.infoLink}`}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={styles.infoRow}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-secondary ${styles.whatsappButton}`}
              >
                <WhatsAppIcon />
                {t('contact.whatsappCta')}
              </a>
            </div>

            <div className={styles.mapCard}>
              <iframe
                src={MAP_EMBED_URL}
                title={`Xəritədə ${CONTACT.address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.map}
              />
            </div>

            <div className={styles.card}>
              <h3 className={styles.whatsappTitle}>{t('contact.quickReplyTitle')}</h3>
              <p className={styles.whatsappText}>{t('contact.quickReplyText')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
