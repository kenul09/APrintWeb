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
    return <p style={{ color: "rgba(var(--ink-rgb),0.5)", fontSize: "0.9rem" }}>Yüklənir…</p>;
  }
  if (status === "error") {
    return <p style={{ color: "rgba(var(--ink-rgb),0.5)", fontSize: "0.9rem" }}>Qiymət siyahısı yüklənə bilmədi.</p>;
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
            background: "linear-gradient(180deg, rgba(var(--ink-rgb),0.05), rgba(var(--ink-rgb),0.025))",
            border: "1px solid rgba(var(--ink-rgb),0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontSize: "1.6rem" }}>🖨️</div>
          <div style={{ color: "var(--foreground)", fontSize: "0.95rem", fontWeight: 600 }}>
            {product.name}
          </div>
          {product.price && (
            <div style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 700 }}>
              {product.price}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
