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
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s, background-color 0.2s, border-color 0.2s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        borderColor: hovered ? "var(--color-border-strong)" : "var(--color-border)",
      }}
    >
      <div
        style={{
          height: 320,
          overflow: "hidden",
          position: "relative",
          background: "var(--color-bg)",
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
      </div>

      <div style={{ padding: "14px 20px 16px" }}>
        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--color-text)",
            lineHeight: 1.3,
          }}
        >
          {work.title}
        </h3>
      </div>
    </article>
  );
}
