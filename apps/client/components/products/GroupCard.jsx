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
        background: hovered
          ? `linear-gradient(180deg, ${group.accent}18, rgba(var(--ink-rgb),0.04))`
          : "linear-gradient(180deg, rgba(var(--ink-rgb),0.05), rgba(var(--ink-rgb),0.025))",
        border: `1px solid ${hovered ? `${group.accent}66` : "rgba(var(--ink-rgb),0.08)"}`,
        boxShadow: hovered
          ? `0 28px 70px ${group.accent}20`
          : "0 14px 34px rgba(0,0,0,0.22)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.32s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -40,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${group.accent}35, transparent 70%)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

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
            background: `${group.accent}18`,
            color: group.accent,
            fontWeight: 700,
            fontSize: "1rem",
            border: `1px solid ${group.accent}44`,
            boxShadow: `0 10px 24px ${group.accent}18`,
            flexShrink: 0,
          }}
        >
          {String(group.id).padStart(2, "0")}
        </div>

        <div
          style={{
            padding: "7px 12px",
            borderRadius: 999,
            background: "rgba(var(--ink-rgb),0.05)",
            color: "rgba(var(--ink-rgb),0.55)",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
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
            fontFamily: '"Oswald", sans-serif',
            fontSize: "2rem",
            fontWeight: 500,
            lineHeight: 1.02,
            color: "var(--foreground)",
          }}
        >
          {group.title}
        </h2>

        <p
          style={{
            margin: "0 0 22px",
            color: "rgba(var(--ink-rgb),0.56)",
            fontSize: "0.94rem",
            lineHeight: 1.75,
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
                background: hovered
                  ? "rgba(var(--ink-rgb),0.05)"
                  : "rgba(var(--ink-rgb),0.025)",
                border: "1px solid rgba(var(--ink-rgb),0.05)",
                color: "rgba(var(--ink-rgb),0.74)",
                fontSize: "0.92rem",
                lineHeight: 1.45,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.borderColor = `${group.accent}55`;
                e.currentTarget.style.color = "var(--foreground)";
                e.currentTarget.style.background = `${group.accent}14`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.borderColor = "rgba(var(--ink-rgb),0.05)";
                e.currentTarget.style.color = "rgba(var(--ink-rgb),0.74)";
                e.currentTarget.style.background = hovered
                  ? "rgba(var(--ink-rgb),0.05)"
                  : "rgba(var(--ink-rgb),0.025)";
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
