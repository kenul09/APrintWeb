import styles from '../styles/pagination.module.css';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.navButton}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Əvvəlki
      </button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={p === page ? styles.pageButtonActive : styles.pageButton}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className={styles.navButton}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Növbəti
      </button>
    </div>
  );
}
