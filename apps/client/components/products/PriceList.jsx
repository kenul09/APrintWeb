"use client";

import { useEffect, useState } from "react";

export default function PriceList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (products.length === 0) return null;

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
          <div style={{ fontSize: "1.6rem" }}>{product.icon}</div>
          <div style={{ color: "var(--foreground)", fontSize: "0.95rem", fontWeight: 600 }}>
            {product.title}
          </div>
          <div style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 700 }}>
            {product.price}
          </div>
        </div>
      ))}
    </div>
  );
}
