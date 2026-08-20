import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialPosts } from '../data/blog';
import { apiFetch } from '../lib/api';
import StatCard from '../components/StatCard';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    apiFetch('/api/products').then(res => res.json()).then(setProducts).catch(() => {});
    apiFetch('/api/orders').then(res => res.json()).then(setOrders).catch(() => {});
    apiFetch('/api/customers').then(res => res.json()).then(setCustomers).catch(() => {});
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Panelə ümumi baxış</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard icon="🗞️" label="Məhsullar" value={totalProducts} />
        <StatCard icon="📦" label="Sifarişlər" value={totalOrders} />
        <StatCard icon="👥" label="Müştərilər" value={totalCustomers} />
        <StatCard icon="✍️" label="Blog postlar" value={initialPosts.length} />
      </div>

      <div className={styles.columns}>
        <section className={styles.panel}>
          <div className={styles.panelTitle}>Son Sifarişlər</div>
          <div className={styles.list}>
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className={styles.row}>
                <div className={styles.rowTop}>
                  <div><strong>{o.id}</strong> — {o.customer}</div>
                  <div className={styles.amount}>{o.amount}</div>
                </div>
                <div className={styles.rowSub}>{o.product} • {o.date}</div>
              </div>
            ))}
          </div>
          <Link to="/admin/orders" className={styles.viewAll}>Hamısına bax →</Link>
        </section>

        <aside className={styles.panel}>
          <div className={styles.panelTitle}>Yeni Müştərilər</div>
          <div className={styles.list}>
            {customers.slice(0, 5).map(c => (
              <div key={c.id} className={styles.row}>
                <div className={styles.rowTop}>
                  <div>{c.name}</div>
                  <div className={styles.amount}>{c.total}</div>
                </div>
                <div className={styles.rowSub}>{c.orders} sifariş • {c.date}</div>
              </div>
            ))}
          </div>
          <Link to="/admin/customers" className={styles.viewAll}>Hamısına bax →</Link>
        </aside>
      </div>
    </div>
  );
}
