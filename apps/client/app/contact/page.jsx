"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./contact.module.css";
import { glassStyle } from "@/components/ui/glassStyle";
import { useI18n } from '@/components/i18n/I18nProvider';

const inputBase = {
  width: "100%",
  background: "rgba(var(--ink-rgb),0.04)",
  border: "1px solid rgba(var(--ink-rgb),0.08)",
  borderRadius: "12px",
  padding: "14px 18px",
  color: "var(--foreground)",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: '"DM Sans", sans-serif',
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");
  const [heroRef, heroIn] = useInView(0.1);
  const [formRef, formIn] = useInView(0.1);
  const [infoRef, infoIn] = useInView(0.1);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setError(t('contact.errors.required'));
      return;
    }

    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!emailOk) {
      setError(t('contact.errors.invalidEmail'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("submit failed");
      setSent(true);
      setError("");
    } catch {
      setError(t('contact.errors.submitFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageShell}>
      <div className={styles.contactWrap}>
        <section ref={heroRef} className={styles.contactHero}>
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
            }}
            className={styles.inlineLabel}
          >
            <div className={styles.labelDot} />
            <span>{t('contact.badge')}</span>
          </div>

          <h1
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s 0.2s, transform 0.9s 0.2s",
            }}
            className={styles.heroTitle}
          >
            <span className={styles.gradientText}>{t('contact.heroTitle')}</span>
          </h1>

          <p
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s 0.35s, transform 0.9s 0.35s",
            }}
            className={styles.heroText}
          >
            {t('contact.heroText')}
          </p>
        </section>

        <div className={styles.contactGrid}>
          <div
            ref={formRef}
            className={styles.contactFormBox}
            style={{
              ...glassStyle,
              opacity: formIn ? 1 : 0,
              transform: formIn ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.9s 0.1s, transform 0.9s 0.1s",
            }}
          >
            {sent ? (
              <div className={styles.successWrap}>
                <div className={styles.successBadge}>✓</div>
                <h3 className={styles.successTitle}>{t('contact.successTitle')}</h3>
                <p className={styles.successText}>{t('contact.successText')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { label: t('contact.labels.name'), key: "name", placeholder: t('contact.placeholders.name'), type: "text" },
                  { label: t('contact.labels.email'), key: "email", placeholder: t('contact.placeholders.email'), type: "email" },
                  { label: t('contact.labels.phone'), key: "phone", placeholder: t('contact.placeholders.phone'), type: "tel" },
                ].map((field) => (
                  <div key={field.key} className={styles.fieldWrap}>
                    <label className={styles.fieldLabel}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused("")}
                      style={{
                        ...inputBase,
                        borderColor:
                          focused === field.key ? "rgba(139,92,246,0.6)" : "rgba(var(--ink-rgb),0.08)",
                        background:
                          focused === field.key ? "rgba(139,92,246,0.08)" : "rgba(var(--ink-rgb),0.04)",
                        boxShadow:
                          focused === field.key ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
                      }}
                    />
                  </div>
                ))}

                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>{t('contact.labels.service')}</label>
                  <select
                    value={form.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    onFocus={() => setFocused("service")}
                    onBlur={() => setFocused("")}
                    style={{
                      ...inputBase,
                      color: form.service ? "var(--foreground)" : "rgba(var(--ink-rgb),0.2)",
                      borderColor:
                        focused === "service" ? "rgba(139,92,246,0.6)" : "rgba(var(--ink-rgb),0.08)",
                      background:
                        focused === "service" ? "rgba(139,92,246,0.08)" : "rgba(var(--ink-rgb),0.04)",
                      boxShadow:
                        focused === "service" ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">{t('contact.labels.service')}</option>
                    {t('contact.services').map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldWrapMessage}>
                  <label className={styles.fieldLabel}>{t('contact.labels.message')}</label>
                  <textarea
                    rows={4}
                    placeholder={t('contact.placeholders.message')}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    style={{
                      ...inputBase,
                      resize: "none",
                      borderColor:
                        focused === "message" ? "rgba(139,92,246,0.6)" : "rgba(var(--ink-rgb),0.08)",
                      background:
                        focused === "message" ? "rgba(139,92,246,0.08)" : "rgba(var(--ink-rgb),0.04)",
                      boxShadow:
                        focused === "message" ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
                    }}
                  />
                </div>

                {error && <div className={styles.errorBox}>{error}</div>}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1 }}
                  onMouseEnter={(e) => {
                    if (submitting) return;
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    if (submitting) return;
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {submitting ? "..." : t('contact.submit')}
                </button>
              </form>
            )}
          </div>

          <div
            ref={infoRef}
            style={{
              opacity: infoIn ? 1 : 0,
              transform: infoIn ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s 0.3s, transform 0.9s 0.3s",
            }}
          >
            <div className={styles.contactInfoBox} style={{ ...glassStyle, marginBottom: 16 }}>
              <h3 className={styles.infoTitle}>{t('contact.contactInfoTitle')}</h3>

              {[
                { icon: "📍", title: "Ünvan", value: "Bakı, Sahil m/s yaxınlığı" },
                { icon: "📞", title: "Telefon", value: "+994 55 750 55 33" },
                { icon: "📧", title: "Email", value: "asadov_78@mail.ru" },
                { icon: "🕐", title: "İş saatları", value: "B.e – C.a: 09:00 – 21:00" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={styles.infoRow}
                  style={{
                    borderBottom: i < 3 ? "1px solid rgba(var(--ink-rgb),0.05)" : "none",
                    paddingBottom: i < 3 ? 24 : 0,
                    marginBottom: i < 3 ? 24 : 0,
                  }}
                >
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div>
                    <div className={styles.infoLabel}>{item.title}</div>
                    <div className={styles.infoValue}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={styles.whatsappBox}
              style={{
                ...glassStyle,
                background: "rgba(37,211,102,0.05)",
                borderColor: "rgba(37,211,102,0.15)",
              }}
            >
              <h4 className={styles.whatsappTitle}>{t('contact.quickReplyTitle')}</h4>
              <p className={styles.whatsappText}>{t('contact.quickReplyText')}</p>
              <a
                href="https://wa.me/994557505533?text=Salam%2C%20sifari%C5%9Fl%C9%99%20ba%C4%9Fl%C4%B1%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
