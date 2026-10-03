"use client";

import { useCountUp } from "@/hooks/useCountUp";

const VALUE_PATTERN = /^(\d+(?:\.\d+)?)(.*)$/;

// countUp={false} shows the value as-is (e.g. a founding year, where
// counting up from 0 would read oddly).
export default function AnimatedStat({ value, label, active, countUp = true, classNames }) {
  const match = value.match(VALUE_PATTERN);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isDecimal = match ? match[1].includes(".") : false;

  const current = useCountUp(target, active && countUp);
  const display = isDecimal ? current.toFixed(1) : Math.round(current);

  return (
    <div className={classNames.box}>
      <div className={classNames.value}>
        {countUp && match ? (
          <>
            {display}
            {suffix}
          </>
        ) : (
          value
        )}
      </div>
      <div className={classNames.label}>{label}</div>
    </div>
  );
}
