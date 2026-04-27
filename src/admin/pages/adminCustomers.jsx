const customers = [
  { id: 1, name: 'Əli Həsənov', email: 'ali@gmail.com', orders: 5, total: '375₼', date: 'Jan 2026' },
  { id: 2, name: 'Leyla Əliyeva', email: 'leyla@gmail.com', orders: 3, total: '270₼', date: 'Feb 2026' },
  { id: 3, name: 'Murad Quliyev', email: 'murad@gmail.com', orders: 8, total: '640₼', date: 'Dec 2025' },
  { id: 4, name: 'Nigar Hüseynova', email: 'nigar@gmail.com', orders: 2, total: '178₼', date: 'Mar 2026' },
  { id: 5, name: 'Tural Babayev', email: 'tural@gmail.com', orders: 6, total: '480₼', date: 'Nov 2025' },
];

const avatarColors = [
  'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #3b82f6, #60a5fa)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
];

export default function AdminCustomers() {
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
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.03em',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}>Müştərilər</h1>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', marginTop: 4 }}>
          Cəmi {customers.length} müştəri
        </p>
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
              {['Ad Soyad', 'Email', 'Sifariş sayı', 'Ümumi', 'Qeydiyyat'].map(h => (
                <th key={h} style={{
                  padding: '16px 24px', textAlign: 'left',
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.65rem', letterSpacing: '0.16em',
                  fontWeight: 600, textTransform: 'uppercase',
                  fontFamily: '"DM Sans", sans-serif',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr
                key={c.id}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Name */}
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: avatarColors[i % avatarColors.length],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: '0.82rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}>
                      {c.name[0]}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: '0.88rem', color: '#fff' }}>{c.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.35)', fontSize: '0.83rem' }}>
                  {c.email}
                </td>

                {/* Orders */}
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    background: 'rgba(139,92,246,0.12)',
                    color: '#a78bfa',
                    border: '1px solid rgba(139,92,246,0.2)',
                    borderRadius: '6px', padding: '3px 12px',
                    fontSize: '0.78rem', fontWeight: 600,
                  }}>{c.orders}</span>
                </td>

                {/* Total */}
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.1rem', letterSpacing: '0.03em',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{c.total}</span>
                </td>

                {/* Date */}
                <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
                  {c.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}