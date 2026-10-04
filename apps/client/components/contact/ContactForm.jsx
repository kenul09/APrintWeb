"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./ContactForm.module.css";
import { useI18n } from "@/components/i18n/I18nProvider";
import { contactService } from "@/lib/api/contactService";
import { categoryGroups } from "@/data/products";
import { ArrowRightIcon, CheckIcon } from "@/components/icons/Icons";

const SERVICE_OPTIONS = categoryGroups.map((group) => group.slug);
const OTHER = "other";
const PHONE_PREFIX = "+994 ";
const FIELD_ORDER = ["name", "email", "phone", "message"];
const EMPTY_FORM = { name: "", email: "", phone: PHONE_PREFIX, service: null, message: "", website: "" };

// International numbers in E.164 form (+<country><number>, 8–15 digits).
// Numbers without a country code are read as Azerbaijani: 0XX XXX XX XX,
// XX XXX XX XX or 994XXXXXXXXX. Spaces, dashes, dots and brackets are
// ignored. Returns the normalized number or null.
export function normalizePhone(value) {
  const compact = value.replace(/[\s\-().]/g, "").replace(/^00/, "+");
  // Local number typed after the prefilled +994 ("+994 050 …"): drop the 0.
  if (/^\+9940\d{9}$/.test(compact)) return `+994${compact.slice(5)}`;
  // Azerbaijani numbers always have 9 digits after the country code.
  if (compact.startsWith("+994")) return /^\+994\d{9}$/.test(compact) ? compact : null;
  if (/^\+\d{8,15}$/.test(compact)) return compact;
  if (/^994\d{9}$/.test(compact)) return `+${compact}`;
  if (/^0\d{9}$/.test(compact)) return `+994${compact.slice(1)}`;
  if (/^\d{9}$/.test(compact)) return `+994${compact}`;
  return null;
}

function isBlankPhone(value) {
  return value.replace(/[\s\-().+]/g, "") === "" || value.trim() === PHONE_PREFIX.trim();
}

function validate(form, t) {
  const errors = {};
  if (!form.name.trim()) errors.name = t("contact.errors.nameRequired");
  // Email is required because the backend (apps/backend contact.schema.ts)
  // rejects messages without a valid email.
  if (!form.email.trim()) errors.email = t("contact.errors.emailRequired");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = t("contact.errors.emailInvalid");
  if (isBlankPhone(form.phone)) errors.phone = t("contact.errors.phoneRequired");
  else if (!normalizePhone(form.phone)) errors.phone = t("contact.errors.phoneInvalid");
  if (!form.message.trim()) errors.message = t("contact.errors.messageRequired");
  return errors;
}

export function ContactForm({ preselectedService = "" }) {
  const { t } = useI18n();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const formRef = useRef(null);
  const successRef = useRef(null);
  const service = form.service ?? (SERVICE_OPTIONS.includes(preselectedService) || preselectedService === OTHER ? preselectedService : "");

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
    const firstError = FIELD_ORDER.find((key) => found[key]);
    if (firstError) {
      formRef.current?.elements.namedItem(firstError)?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill "website". Pretend success
    // so bots get no signal.
    if (form.website) {
      setStatus("sent");
      return;
    }

    const serviceLabel = service === OTHER ? t("contact.serviceOther") : service ? t(`products.categories.${service}.title`) : null;

    setStatus("sending");
    try {
      await contactService.create({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: normalizePhone(form.phone),
        message: form.message.trim(),
        ...(serviceLabel ? { service: serviceLabel } : {}),
      });
      setStatus("sent");
      requestAnimationFrame(() => successRef.current?.focus());
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

  const field = (key, { type = "text", autoComplete, multiline = false, inputMode, hint } = {}) => {
    const id = `contact-${key}`;
    const errorId = `${id}-error`;
    const hintId = hint ? `${id}-hint` : null;
    const describedBy = [hintId, errors[key] ? errorId : null].filter(Boolean).join(" ") || undefined;
    const common = {
      id,
      name: key,
      value: form[key],
      placeholder: t(`contact.placeholders.${key}`),
      onChange: (e) => handleChange(key, e.target.value),
      className: styles.input,
      autoComplete,
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": describedBy,
      "aria-required": true,
    };
    return (
      <div className={styles.fieldWrap}>
        <label htmlFor={id} className={styles.fieldLabel}>
          {t(`contact.labels.${key}`)}
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        </label>
        {multiline ? <textarea rows={5} {...common} /> : <input type={type} inputMode={inputMode} {...common} />}
        {hint && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        {errors[key] && (
          <p id={errorId} className={styles.fieldError}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  if (status === "sent") {
    return (
      <div ref={successRef} className={styles.successWrap} role="status" tabIndex={-1}>
        <div className={styles.successBadge} aria-hidden="true">
          <CheckIcon size={28} strokeWidth={2.5} />
        </div>
        <p className={styles.successText}>{t("contact.successText")}</p>
        <button type="button" className="btn-secondary" onClick={resetForm}>
          {t("contact.newMessage")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className={styles.formTitle}>
        {t("contact.formTitle")}
      </h2>
      <p className={styles.requiredNote}>{t("contact.requiredNote")}</p>

      {field("name", { autoComplete: "name" })}
      {field("email", { type: "email", autoComplete: "email" })}
      {field("phone", { type: "tel", autoComplete: "tel", inputMode: "tel", hint: t("contact.phoneHint") })}

      <div className={styles.fieldWrap}>
        <label htmlFor="contact-service" className={styles.fieldLabel}>
          {t("contact.labels.service")}
        </label>
        <select
          id="contact-service"
          name="service"
          value={service}
          onChange={(e) => handleChange("service", e.target.value)}
          className={`${styles.input} ${service ? "" : styles.selectPlaceholder}`}
        >
          <option value="">{t("contact.servicePlaceholder")}</option>
          {SERVICE_OPTIONS.map((slug) => (
            <option key={slug} value={slug}>
              {t(`products.categories.${slug}.title`)}
            </option>
          ))}
          <option value={OTHER}>{t("contact.serviceOther")}</option>
        </select>
      </div>

      {field("message", { multiline: true })}

      {/* Honeypot — hidden from people and assistive tech, bots fill it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">{t("contact.honeypot")}</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      <div aria-live="assertive">
        {status === "failed" && <div className={styles.errorBox}>{t("contact.errors.submitFailed")}</div>}
      </div>

      <button type="submit" className={`btn-primary ${styles.submitButton}`} disabled={status === "sending"} aria-busy={status === "sending"}>
        {status === "sending" && <span className={styles.spinner} aria-hidden="true" />}
        {status === "sending" ? t("contact.submitting") : t("contact.submit")}
        {status !== "sending" && <ArrowRightIcon size={18} />}
      </button>
      <p className="sr-only" aria-live="polite">
        {status === "sending" ? t("contact.submitting") : ""}
      </p>
    </form>
  );
}

export function ContactFormFromUrl() {
  const service = useSearchParams().get("service") ?? "";
  return <ContactForm preselectedService={service} />;
}
