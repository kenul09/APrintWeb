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
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background 0.3s, border-color 0.3s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
        background: hovered ? "rgba(139,92,246,0.12)" : "rgba(var(--ink-rgb),0.04)",
        borderColor: hovered ? "rgba(139,92,246,0.4)" : "rgba(var(--ink-rgb),0.08)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: hovered
            ? "linear-gradient(135deg, #8b5cf6, #a78bfa)"
            : "rgba(var(--ink-rgb),0.06)",
          border: "1px solid rgba(var(--ink-rgb),0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: "1.1rem",
          color: "var(--foreground)",
          transition: "background 0.3s",
        }}
      >
        {m.initials}
      </div>

      <div
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.88rem",
          fontWeight: 500,
          color: "var(--foreground)",
          marginBottom: 6,
        }}
      >
        {m.name}
      </div>

      <div
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.68rem",
          color: "rgba(var(--ink-rgb),0.3)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {m.role}
      </div>
    </div>
  );
}
