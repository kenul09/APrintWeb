"use client";

import { useCountUp } from "@/hooks/useCountUp";
import styles from "./StatGrid.module.css";

const VALUE_PATTERN = /^(\d+(?:\.\d+)?)(.*)$/;

// "2000+" counts up to 2000 and keeps the "+"; non-numeric values
// ("24 saat", "5.0★" handled as 5.0 + "★") are split the same way.
// countUp={false} shows the value as-is.
export default function AnimatedStat({ value, label, countUp = true }) {
  const match = String(value).match(VALUE_PATTERN);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [ref, current] = useCountUp(target, { enabled: countUp && Boolean(match) });

  return (
    <div className={styles.box}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value} ref={ref}>
        {match ? (
          <>
            {current.toFixed(decimals)}
            {suffix}
          </>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
