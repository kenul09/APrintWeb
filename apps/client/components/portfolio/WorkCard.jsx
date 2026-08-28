"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { glassStyle } from "@/components/ui/glassStyle";

// The API stores `image` as either an absolute URL (http/https) or a path
// into apps/client/public (e.g. "/portfolio/xxx.png"). Anything else (null,
// empty, a bare filename with no leading slash, etc.) is bad data that would
// make next/image throw "Failed to construct 'URL': Invalid URL" — guard
// against it instead of crashing the whole Portfolio page over one record.
function resolveImageSrc(image, title) {
  if (typeof image === "string") {
    const trimmed = image.trim();
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
      return trimmed;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[WorkCard] Portfolio item "${title}" has an invalid image value:`, image);
  }
  return null;
}

export default function WorkCard({ work, delay = 0, forceVisible = false }) {
  const [ref, observedInView] = useInView();
  const inView = forceVisible || observedInView;
  const [hovered, setHovered] = useState(false);
  const imageSrc = resolveImageSrc(work.image, work.title);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassStyle,
        overflow: "hidden",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background 0.3s, border-color 0.3s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        background: hovered ? "rgba(139,92,246,0.1)" : "rgba(var(--ink-rgb),0.04)",
        borderColor: hovered ? "rgba(139,92,246,0.35)" : "rgba(var(--ink-rgb),0.08)",
      }}
    >
      <div
        style={{
          height: 320,
          overflow: "hidden",
          position: "relative",
          background: "#0d0d1a",
        }}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.5s",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              display: "block",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to bottom, transparent 40%, rgba(139,92,246,0.4))"
              : "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5))",
            transition: "background 0.3s",
          }}
        />
      </div>

      <div style={{ padding: "14px 20px 16px" }}>
        <h3
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontSize: "1.5rem",
            fontWeight: 500,
            letterSpacing: "0.03em",
            margin: 0,
            color: "var(--foreground)",
            lineHeight: 1.2,
          }}
        >
          {work.title}
        </h3>
      </div>
    </article>
  );
}
