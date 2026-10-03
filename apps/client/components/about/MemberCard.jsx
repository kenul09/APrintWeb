"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { glassStyle } from "@/components/ui/glassStyle";

export default function MemberCard({ m, delay = 0 }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassStyle,
        padding: "36px 24px",
        textAlign: "center",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background-color 0.2s, border-color 0.2s, color 0.2s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
        borderColor: hovered ? "var(--color-border-strong)" : "var(--color-border)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: hovered ? "var(--color-accent-soft)" : "var(--color-bg)",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          fontSize: "1rem",
          fontWeight: 600,
          color: hovered ? "var(--color-accent)" : "var(--color-text)",
          transition: "background-color 0.2s, color 0.2s",
        }}
      >
        {m.initials}
      </div>

      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "var(--color-text)",
          marginBottom: 6,
        }}
      >
        {m.name}
      </div>

      <div
        style={{
          fontSize: "0.8rem",
          color: "var(--color-text-muted)",
          fontWeight: 400,
        }}
      >
        {m.role}
      </div>
    </div>
  );
}
