import styles from "./ContactInfoList.module.css";

// Icon + label + value rows (phone, email, address, hours) used by the
// footer (`compact`) and the contact page. Rows with `href` are links;
// `external` ones open in a new tab and say so to screen readers.
// rows: [{ key, Icon, label, value, href?, external? }]
export default function ContactInfoList({ rows, newTabLabel, compact = false }) {
  return (
    <ul className={`${styles.list} ${compact ? styles.compact : ""}`}>
      {rows.map(({ key, Icon, label, value, href, external }) => {
        const content = (
          <>
            <span className={styles.icon}>
              <Icon size={compact ? 18 : 20} />
            </span>
            <span>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </span>
          </>
        );
        return (
          <li key={key}>
            {href ? (
              <a
                href={href}
                className={`${styles.row} ${styles.link}`}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {content}
                {external && <span className="sr-only">{newTabLabel}</span>}
              </a>
            ) : (
              <div className={styles.row}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
