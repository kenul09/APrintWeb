"use client";

import { useCountUp } from "@/hooks/useCountUp";

const VALUE_PATTERN = /^(\d+(?:\.\d+)?)(.*)$/;

export default function AnimatedStat({ value, label, active }) {
  const match = value.match(VALUE_PATTERN);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isDecimal = match ? match[1].includes(".") : false;

  const current = useCountUp(target, active);
  const display = isDecimal ? current.toFixed(1) : Math.round(current);

  return (
    <div className="stat-box">
      <div className="stat-val">
        {display}
        {suffix}
      </div>
      <div
        style={{
          color: "rgba(var(--ink-rgb),0.56)",
          marginTop: "8px",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
