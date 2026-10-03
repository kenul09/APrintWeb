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
          fontSize: "3rem",
          fontWeight: 600,
          color: "var(--color-text)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginBottom: "10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--color-text-muted)",
          fontWeight: 500,
          position: "relative",
          zIndex: 1,
        }}
      >
        {l}
      </div>
    </div>
  );
}
