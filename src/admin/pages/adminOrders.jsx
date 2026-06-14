'use client';

import { useState } from 'react';
import styles from "../styles/adminOrders.module.css";
import clsx from 'clsx';

const initialOrders = [
  { id: '#001', customer: 'Əli Həsənov',    product: 'Flayer',     amount: '75₼',  status: 'Tamamlandı', date: '11 Mar 2026' },
  { id: '#002', customer: 'Leyla Əliyeva',  product: 'Banner',     amount: '135₼', status: 'Hazırlanır', date: '11 Mar 2026' },
  { id: '#003', customer: 'Murad Quliyev',  product: 'Vizit kart', amount: '50₼',  status: 'Gözləyir',  date: '10 Mar 2026' },
  { id: '#004', customer: 'Nigar Hüseynova',product: 'Roll-up',    amount: '178₼', status: 'Tamamlandı', date: '10 Mar 2026' },
  { id: '#005', customer: 'Tural Babayev',  product: 'Stiker',     amount: '40₼',  status: 'Hazırlanır', date: '9 Mar 2026'  },
];

const ALL_STATUSES = ['Hamısı', 'Gözləyir', 'Hazırlanır', 'Tamamlandı'];
const CHANGE_STATUSES = ['Gözləyir', 'Hazırlanır', 'Tamamlandı'];
const TABLE_HEADERS   = ['ID', 'Müştəri', 'Məhsul', 'Məbləğ', 'Tarix', 'Status', 'Əməliyyat'];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('Hamısı');

  const filtered = filter === 'Hamısı'
    ? orders
    : orders.filter(o => o.status === filter);

  const changeStatus = (id, newStatus) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));

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