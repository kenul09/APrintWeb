"use client";

import { useInView } from "@/hooks/useInView";
import { glassStyle } from "@/components/ui/glassStyle";

export default function StatCard({ n, l, delay = 0 }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        ...glassStyle,
        padding: "40px 32px",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: "3.5rem",
          color: "var(--foreground)",
          lineHeight: 1,
          letterSpacing: "0.02em",
          marginBottom: "10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.72rem",
          color: "rgba(var(--ink-rgb),0.35)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 300,
          position: "relative",
          zIndex: 1,
        }}
      >
        {l}
      </div>
    </div>
  );
}
