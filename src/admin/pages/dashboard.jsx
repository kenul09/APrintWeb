const stats = [
  { label: 'Ümumi sifariş', value: '124', icon: '📦', change: '+12%', grad: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  { label: 'Bu ay gəlir', value: '3,840₼', icon: '💰', change: '+8%', grad: 'linear-gradient(135deg, #10b981, #34d399)' },
  { label: 'Müştəri', value: '89', icon: '👥', change: '+5%', grad: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { label: 'Gözləyən', value: '7', icon: '⏳', change: '-2', grad: 'linear-gradient(135deg, #ef4444, #f87171)' },
];

const recentOrders = [
  { id: '#001', customer: 'Əli Həsənov', product: 'Flayer', amount: '75₼', status: 'Tamamlandı' },
  { id: '#002', customer: 'Leyla Əliyeva', product: 'Banner', amount: '135₼', status: 'Hazırlanır' },
  { id: '#003', customer: 'Murad Quliyev', product: 'Vizit kart', amount: '50₼', status: 'Gözləyir' },
  { id: '#004', customer: 'Nigar Hüseynova', product: 'Roll-up', amount: '178₼', status: 'Tamamlandı' },
  { id: '#005', customer: 'Tural Babayev', product: 'Stiker', amount: '40₼', status: 'Hazırlanır' },
];

const statusConfig = {
  'Tamamlandı': { color: '#4ade80', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)' },
  'Hazırlanır':  { color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
  'Gözləyir':   { color: '#a78bfa', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
};

const glass = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '20px',
};

export default function Dashboard() {
  return (
    <div style={{ padding: '40px 48px', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.03em',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
          marginBottom: 6,
        }}>Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>
          Xoş gəldiniz, Admin! Bugünkü statistika.
        </p>
      </div>

      {/* ── STATS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              ...glass,
              padding: '28px 24px',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
          >
            {/* bg glow */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(circle at 80% 20%, ${s.grad.match(/#\w+/g)?.[0]}22, transparent 60%)`,
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  fontSize: '0.65rem', letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 600,
                }}>{s.label}</div>
                <div style={{
                  width: 38, height: 38, borderRadius: '12px',
                  background: s.grad.replace('linear-gradient(135deg,', 'linear-gradient(135deg,').split(')')[0] + ', opacity 0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>{s.icon}</div>
              </div>

              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '2.2rem', lineHeight: 1, letterSpacing: '0.02em',
                background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: 10,
              }}>{s.value}</div>

              <div style={{
                fontSize: '0.75rem', fontWeight: 600,
                background: s.grad,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.change} bu ay</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── RECENT ORDERS ── */}
      <div style={{ ...glass, overflow: 'hidden' }}>
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.3rem', fontWeight: 400, letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Son sifarişlər</h2>
          <span style={{
            fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600,
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Hamısına bax →</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['ID', 'Müştəri', 'Məhsul', 'Məbləğ', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '14px 28px', textAlign: 'left',
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.65rem', letterSpacing: '0.16em',
                  fontWeight: 600, textTransform: 'uppercase',
                  fontFamily: '"DM Sans", sans-serif',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(o => {
              const sc = statusConfig[o.status];
              return (
                <tr
                  key={o.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px 28px' }}>
                    <span style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1rem', letterSpacing: '0.05em',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>{o.id}</span>
                  </td>
                  <td style={{ padding: '16px 28px', fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>{o.customer}</td>
                  <td style={{ padding: '16px 28px', color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>{o.product}</td>
                  <td style={{ padding: '16px 28px' }}>
                    <span style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.05rem',
                      background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>{o.amount}</span>
                  </td>
                  <td style={{ padding: '16px 28px' }}>
                    <span style={{
                      background: sc.bg, color: sc.color,
                      border: `1px solid ${sc.border}`,
                      borderRadius: '8px', padding: '4px 12px',
                      fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                    }}>{o.status}</span>
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