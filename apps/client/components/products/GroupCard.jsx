"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function GroupCard({ group }) {
  const [hovered, setHovered] = useState(false);
  const { t, lang } = useI18n();
  const count = group.items.length;
  const unit = t(`products.itemsUnit.${new Intl.PluralRules(lang).select(count)}`);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 30,
        padding: 30,
        overflow: "hidden",
        background: "var(--color-surface)",
        border: `1px solid ${hovered ? "var(--color-border-strong)" : "var(--color-border)"}`,
        transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 22,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            background: "var(--color-accent-soft)",
            color: "var(--color-accent)",
            fontWeight: 600,
            fontSize: "0.9375rem",
            flexShrink: 0,
          }}
        >
          {String(group.id).padStart(2, "0")}
        </div>

        <div
          style={{
            padding: "7px 12px",
            borderRadius: 999,
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            fontSize: "0.8rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {count} {unit}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "1.75rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "var(--color-text)",
          }}
        >
          {group.title}
        </h2>

        <p
          style={{
            margin: "0 0 22px",
            color: "var(--color-text-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            maxWidth: 320,
          }}
        >
          {group.subtitle}
        </p>

        {/* Items aren't links (no per-item pages), so they're a plain list —
            no button-like borders or hover effects. */}
        <ul className="group-items-grid">
          {group.items.map((item) => (
            <li key={item} className="group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* The contact form has no category preselect (its service list
          doesn't match these groups), so this links to /contact. */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 22,
        }}
      >
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 18,
          }}
        >
          <Link href="/contact" className="group-card-cta">
            {t("products.cardCta")}
          </Link>
        </div>
      </div>
    </article>
  );
}
