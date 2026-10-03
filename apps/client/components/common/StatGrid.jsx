"use client";

import AnimatedStat from "@/components/common/AnimatedStat";
import { useInView } from "@/hooks/useInView";
import styles from "./StatGrid.module.css";

// items: [{ value: "2000+", label: "Müştəri", countUp?: boolean }]
export default function StatGrid({ items }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={styles.grid} style={{ opacity: inView ? 1 : 0 }}>
      {items.map((item) => (
        <AnimatedStat
          key={item.label}
          value={item.value}
          label={item.label}
          active={inView}
          countUp={item.countUp}
          classNames={styles}
        />
      ))}
    </div>
  );
}
