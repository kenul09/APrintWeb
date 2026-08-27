import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../lib/dashboardService';
import { orderStatusLabel } from '../lib/orderService';
import StatCard from '../components/StatCard';
import styles from '../styles/dashboard.module.css';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' });
  } catch {
    return '—';
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardService
      .getStats()
      .then(setStats)
      .catch(() => setError('Serverlə əlaqə qurmaq mümkün olmadı.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Panelə ümumi baxış</p>
      </div>

      {loading ? (
        <div className={styles.stateBox}>Yüklənir...</div>
      ) : error ? (
        <div className={styles.errorBox}>{error}</div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <StatCard icon="🗞️" label="Məhsullar" value={stats.totals.products} />
            <StatCard icon="📦" label="Sifarişlər" value={stats.totals.orders} />
            <StatCard icon="👥" label="Müştərilər" value={stats.totals.customers} />
            <StatCard icon="✍️" label="Blog postlar" value={stats.totals.blogPosts} />
          </div>

          <div className={styles.columns}>
            <section className={styles.panel}>
              <div className={styles.panelTitle}>Son Sifarişlər</div>
              <div className={styles.list}>
                {stats.recentOrders.length === 0 ? (
                  <div className={styles.stateBox}>Sifariş yoxdur</div>
                ) : (
                  stats.recentOrders.map((o) => (
                    <Link key={o.id} to="/admin/orders" className={styles.rowLink}>
                      <div className={styles.row}>
                        <div className={styles.rowTop}>
                          <div>
                            <strong>{o.customer?.name}</strong>
                          </div>
                          <div className={styles.amount}>{orderStatusLabel(o.status)}</div>
                        </div>
                        <div className={styles.rowSub}>
                          {o.service || '—'} • {formatDate(o.createdAt)}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              <Link to="/admin/orders" className={styles.viewAll}>
                Hamısına bax →
              </Link>
            </section>

            <aside className={styles.panel}>
              <div className={styles.panelTitle}>Yeni Müştərilər</div>
              <div className={styles.list}>
                {stats.recentCustomers.length === 0 ? (
                  <div className={styles.stateBox}>Müştəri yoxdur</div>
                ) : (
                  stats.recentCustomers.map((c) => (
                    <Link key={c.id} to="/admin/customers" className={styles.rowLink}>
                      <div className={styles.row}>
                        <div className={styles.rowTop}>
                          <div>{c.name}</div>
                        </div>
                        <div className={styles.rowSub}>
                          {c.email} • {formatDate(c.createdAt)}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              <Link to="/admin/customers" className={styles.viewAll}>
                Hamısına bax →
              </Link>
            </aside>

            <aside className={styles.panel}>
              <div className={styles.panelTitle}>Son Mesajlar</div>
              <div className={styles.list}>
                {stats.recentMessages.length === 0 ? (
                  <div className={styles.stateBox}>Mesaj yoxdur</div>
                ) : (
                  stats.recentMessages.map((m) => (
                    <Link key={m.id} to="/admin/messages" className={styles.rowLink}>
                      <div className={styles.row}>
                        <div className={styles.rowTop}>
                          <div>{m.name}</div>
                          {!m.isRead && <div className={styles.amount}>Yeni</div>}
                        </div>
                        <div className={styles.rowSub}>
                          {m.email} • {formatDate(m.createdAt)}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              <Link to="/admin/messages" className={styles.viewAll}>
                Hamısına bax →
              </Link>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
