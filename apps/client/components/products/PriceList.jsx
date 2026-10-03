"use client";

import { useEffect, useState } from "react";
import { productService } from "@/lib/api/productService";

const SKELETON_COUNT = 4;

// "Qiymətlər" section of /products. Renders its own heading so that the whole
// section — heading included — disappears when there's nothing to show:
// a failed request or an empty list is logged, never shown to visitors.
export default function PriceList({ title }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    productService
      .getAll({ activeOnly: true })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setProducts(list);
        setStatus(list.length === 0 ? "hidden" : "ready");
      })
      .catch((error) => {
        if (cancelled) return;
        console.warn("[PriceList] Could not load prices from the API — hiding the section:", error);
        setStatus("hidden");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "hidden") return null;

  return (
    <section style={{ marginTop: 64 }} aria-busy={status === "loading"}>
      <style>{`
        @keyframes price-pulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        .price-skeleton { animation: price-pulse 1.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .price-skeleton { animation: none; } }
      `}</style>

      <h2
        style={{
          margin: "0 0 22px",
          fontSize: "1.6rem",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        {status === "loading"
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <div
                key={i}
                className="price-skeleton"
                aria-hidden="true"
                style={{
                  height: 116,
                  borderRadius: 20,
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              />
            ))
          : products.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: "18px 16px",
                  borderRadius: 20,
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ fontSize: "1.6rem" }}>🖨️</div>
                <div style={{ color: "var(--color-text)", fontSize: "0.95rem", fontWeight: 600 }}>
                  {product.name}
                </div>
                {product.price && (
                  <div style={{ color: "var(--color-accent)", fontSize: "0.9rem", fontWeight: 600 }}>
                    {product.price}
                  </div>
                )}
              </div>
            ))}
      </div>
    </section>
  );
}
