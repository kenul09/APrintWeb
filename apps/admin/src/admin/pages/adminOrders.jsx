import { useEffect, useState } from 'react';
import styles from "../styles/adminOrders.module.css";
import clsx from 'clsx';
import { apiFetch } from "../lib/api";

const ALL_STATUSES = ['Hamısı', 'Gözləyir', 'Hazırlanır', 'Tamamlandı'];
const CHANGE_STATUSES = ['Gözləyir', 'Hazırlanır', 'Tamamlandı'];
const TABLE_HEADERS   = ['ID', 'Müştəri', 'Məhsul', 'Məbləğ', 'Tarix', 'Status', 'Əməliyyat'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Hamısı');

  useEffect(() => {
    apiFetch('/api/orders')
      .then(res => res.json())
      .then(setOrders)
      .catch(() => {});
  }, []);

  const filtered = filter === 'Hamısı'
    ? orders
    : orders.filter(o => o.status === filter);

  const changeStatus = async (id, newStatus) => {
    const res = await apiFetch(`/api/orders/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    }
  };

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Sifarişlər</h1>
        <p className={styles.subtitle}>Cəmi {orders.length} sifariş</p>
      </div>

      {/* Filter buttons */}
      <div className={styles.filters}>
        {ALL_STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={clsx(styles.filterBtn, filter === s && styles.filterBtnActive)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              {TABLE_HEADERS.map(h => (
                <th key={h} className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.orderId}>{o.id}</span>
                </td>
                <td className={clsx(styles.td, styles.tdCustomer)}>{o.customer}</td>
                <td className={clsx(styles.td, styles.tdMuted)}>{o.product}</td>
                <td className={styles.td}>
                  <span className={styles.amount}>{o.amount}</span>
                </td>
                <td className={clsx(styles.td, styles.tdDate)}>{o.date}</td>
                <td className={styles.td}>
                  <span className={clsx(styles.badge, styles[`badge_${o.status}`])}>
                    {o.status}
                  </span>
                </td>
                <td className={styles.td}>
                  <select
                    value={o.status}
                    onChange={e => changeStatus(o.id, e.target.value)}
                    className={styles.select}
                  >
                    {CHANGE_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}