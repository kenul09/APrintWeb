"use client";

import { useState } from "react";

export default function GroupCard({ group }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 30,
        padding: 30,
        minHeight: 390,
        overflow: "hidden",
        background: "var(--color-surface)",
        border: `1px solid ${hovered ? "var(--color-border-strong)" : "var(--color-border)"}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.32s ease, background-color 0.2s, color 0.2s, border-color 0.2s",
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
            width: 58,
            height: 58,
            borderRadius: 18,
            display: "grid",
            placeItems: "center",
            background: "var(--color-accent-soft)",
            color: "var(--color-accent)",
            fontWeight: 600,
            fontSize: "1rem",
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
          {group.items.length} istiqamət
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

        <div className="group-items-grid">
          {group.items.map((item) => (
            <div
              key={item}
              style={{
                padding: "10px 12px",
                borderRadius: 14,
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                fontSize: "0.92rem",
                lineHeight: 1.45,
                transition: "transform 0.25s ease, background-color 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.borderColor = "var(--color-border-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
