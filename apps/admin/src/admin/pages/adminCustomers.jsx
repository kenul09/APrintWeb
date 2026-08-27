import { useEffect, useState } from 'react';
import styles from '../styles/adminCustomers.module.css';
import { customerService } from '../lib/customerService';
import { orderStatusLabel } from '../lib/orderService';
import Pagination from '../components/Pagination';

const AVATAR_CLASSES = ['avatarPurple', 'avatarPink', 'avatarBlue', 'avatarGreen', 'avatarAmber'];
const HEADERS = ['Ad Soyad', 'Email', 'Telefon', 'Sifariş sayı', 'Son sifariş', 'Qeydiyyat'];

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    customerService
      .getAll({ page, limit: 10, search })
      .then(({ data, meta }) => {
        if (cancelled) return;
        setCustomers(data);
        setMeta(meta);
      })
      .catch(() => {
        if (!cancelled) setError('Serverlə əlaqə qurmaq mümkün olmadı.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, search]);

  const openDetail = async (id) => {
    setDetailLoading(true);
    try {
      const data = await customerService.getOne(id);
      setSelected(data);
    } catch {
      setSelected(null);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Müştərilər</h1>
        <p className={styles.subtitle}>Cəmi {meta.total} müştəri</p>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Ad və ya email üzrə axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.stateBox}>Yüklənir...</div>
        ) : error ? (
          <div className={styles.errorBox}>{error}</div>
        ) : customers.length === 0 ? (
          <div className={styles.stateBox}>Müştəri yoxdur</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.theadRow}>
                {HEADERS.map((h) => (
                  <th key={h} className={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.id} className={`${styles.tr} ${styles.rowClickable}`} onClick={() => openDetail(c.id)}>
                  <td className={styles.td}>
                    <div className={styles.nameCell}>
                      <div className={`${styles.avatar} ${styles[AVATAR_CLASSES[i % AVATAR_CLASSES.length]]}`}>
                        {c.name[0]?.toUpperCase()}
                      </div>
                      <span className={styles.customerName}>{c.name}</span>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>{c.email}</td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>{c.phone || '—'}</td>
                  <td className={styles.td}>
                    <span className={styles.ordersBadge}>{c.ordersCount}</span>
                  </td>
                  <td className={`${styles.td} ${styles.tdDate}`}>{formatDate(c.lastOrderAt)}</td>
                  <td className={`${styles.td} ${styles.tdDate}`}>{formatDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={meta.page} totalPages={meta.totalPages} onChange={setPage} />

      {(selected || detailLoading) && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.title} style={{ fontSize: '1.4rem' }}>
                Müştəri detalları
              </h3>
              <button className={styles.modalClose} onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            {detailLoading || !selected ? (
              <div className={styles.stateBox}>Yüklənir...</div>
            ) : (
              <>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Ad</span>
                  <span className={styles.modalValue}>{selected.name}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Email</span>
                  <span className={styles.modalValue}>{selected.email}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Telefon</span>
                  <span className={styles.modalValue}>{selected.phone || '—'}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Qeydiyyat tarixi</span>
                  <span className={styles.modalValue}>{formatDate(selected.createdAt)}</span>
                </div>

                <div className={styles.orderHistoryTitle}>Sifariş tarixçəsi ({selected.orders.length})</div>
                {selected.orders.length === 0 ? (
                  <div className={styles.stateBox}>Sifariş yoxdur</div>
                ) : (
                  selected.orders.map((o) => (
                    <div key={o.id} className={styles.orderHistoryRow}>
                      <span>{o.service || '—'}</span>
                      <span>{orderStatusLabel(o.status)}</span>
                      <span>{formatDate(o.createdAt)}</span>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
