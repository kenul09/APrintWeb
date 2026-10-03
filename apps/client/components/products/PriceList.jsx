"use client";

import { useEffect, useState } from "react";
import { productService } from "@/lib/api/productService";

export default function PriceList() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    productService
      .getAll({ activeOnly: true })
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
        setStatus(data.length === 0 ? "empty" : "ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Yüklənir…</p>;
  }
  if (status === "error") {
    return <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Qiymət siyahısı yüklənə bilmədi.</p>;
  }
  if (status === "empty") return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 14,
      }}
    >
      {products.map((product) => (
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
  );
}
