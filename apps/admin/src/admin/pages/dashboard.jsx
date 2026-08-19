import { initialProducts } from '../data/products';
import { initialOrders } from '../data/orders';
import { customers } from '../data/customers';
import { initialPosts } from '../data/blog';
import StatCard from '../components/StatCard';
import '../styles/dashboard.module.css';

export default function Dashboard() {
  const totalProducts = initialProducts.length;
  const totalOrders = initialOrders.length;
  const totalCustomers = customers.length;

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <StatCard icon="🗞️" label="Məhsullar" value={totalProducts} />
        <StatCard icon="📦" label="Sifarişlər" value={totalOrders} />
        <StatCard icon="👥" label="Müştərilər" value={totalCustomers} />
        <StatCard icon="✍️" label="Blog postlar" value={initialPosts.length} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        <section>
          <div style={{ marginBottom: 12, fontWeight: 700 }}>Son Sifarişlər</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {initialOrders.slice(0,5).map(o => (
              <div key={o.id} style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>{o.id}</strong> — {o.customer}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)' }}>{o.amount}</div>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{o.product} • {o.date}</div>
              </div>
            ))}
          </div>
        </section>

        <aside>
          <div style={{ marginBottom: 12, fontWeight: 700 }}>Yeni Müştərilər</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {customers.slice(0,5).map(c => (
              <div key={c.id} style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
                <div>{c.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>{c.total}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}