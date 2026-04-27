import { useState } from 'react';

const initialOrders = [
  { id: '#001', customer: 'Əli Həsənov', product: 'Flayer', amount: '75₼', status: 'Tamamlandı', date: '11 Mar 2026' },
  { id: '#002', customer: 'Leyla Əliyeva', product: 'Banner', amount: '135₼', status: 'Hazırlanır', date: '11 Mar 2026' },
  { id: '#003', customer: 'Murad Quliyev', product: 'Vizit kart', amount: '50₼', status: 'Gözləyir', date: '10 Mar 2026' },
  { id: '#004', customer: 'Nigar Hüseynova', product: 'Roll-up', amount: '178₼', status: 'Tamamlandı', date: '10 Mar 2026' },
  { id: '#005', customer: 'Tural Babayev', product: 'Stiker', amount: '40₼', status: 'Hazırlanır', date: '9 Mar 2026' },
];

const statusConfig = {
  'Tamamlandı': { color: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)' },
  'Hazırlanır':  { color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
  'Gözləyir':   { color: '#a78bfa', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
};

const statuses = ['Hamısı', 'Gözləyir', 'Hazırlanır', 'Tamamlandı'];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('Hamısı');

  const filtered = filter === 'Hamısı' ? orders : orders.filter(o => o.status === filter);
  const changeStatus = (id, newStatus) =>
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

  return (
    <div style={{ padding: '40px 48px', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        select option { background: #1a1a2e; color: #fff; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.03em',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}>Sifarişlər</h1>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', marginTop: 4 }}>
          Cəmi {orders.length} sifariş
        </p>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s
                ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                : 'rgba(255,255,255,0.04)',
              color: filter === s ? '#fff' : 'rgba(255,255,255,0.4)',
              border: filter === s ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '8px 18px',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem',
              fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.05em',
              transition: 'all 0.2s', backdropFilter: 'blur(10px)',
            }}
          >{s}</button>
        ))}
      </div>

      {/* ── TABLE ── */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['ID', 'Müştəri', 'Məhsul', 'Məbləğ', 'Tarix', 'Status', 'Əməliyyat'].map(h => (
                <th key={h} style={{
                  padding: '16px 20px', textAlign: 'left',
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.65rem', letterSpacing: '0.16em',
                  fontWeight: 600, textTransform: 'uppercase',
                  fontFamily: '"DM Sans", sans-serif',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => {
              const sc = statusConfig[o.status];
              return (
                <tr
                  key={o.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* ID */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1rem', letterSpacing: '0.05em',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>{o.id}</span>
                  </td>

                  {/* Customer */}
                  <td style={{ padding: '16px 20px', fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
                    {o.customer}
                  </td>

                  {/* Product */}
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>
                    {o.product}
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.05rem',
                      background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>{o.amount}</span>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
                    {o.date}
                  </td>

                  {/* Status badge */}
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      background: sc.bg, color: sc.color,
                      border: `1px solid ${sc.border}`,
                      borderRadius: '8px', padding: '4px 12px',
                      fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                    }}>{o.status}</span>
                  </td>

                  {/* Select */}
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={o.status}
                      onChange={e => changeStatus(o.id, e.target.value)}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px', padding: '7px 12px',
                        color: '#fff', fontSize: '0.78rem',
                        cursor: 'pointer', outline: 'none',
                        fontFamily: '"DM Sans", sans-serif',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      {['Gözləyir', 'Hazırlanır', 'Tamamlandı'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}