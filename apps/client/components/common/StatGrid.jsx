import AnimatedStat from "@/components/common/AnimatedStat";
import styles from "./StatGrid.module.css";

// items: [{ value: "2000+", label: "Müştəri", countUp?: boolean }]
export default function StatGrid({ items, label }) {
  return (
    <dl className={styles.grid} aria-label={label}>
      {items.map((item) => (
        <AnimatedStat key={item.label} value={item.value} label={item.label} countUp={item.countUp} />
      ))}
    </dl>
  );
}
