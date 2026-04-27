import { useState } from 'react';

const initial = [
  { id: 1, title: 'Flayer', price: '15₼', icon: '🗞️', category: 'Çap', active: true },
  { id: 2, title: 'Banner', price: '45₼', icon: '🎌', category: 'Reklam', active: true },
  { id: 3, title: 'Roll-up', price: '89₼', icon: '📜', category: 'Reklam', active: true },
  { id: 4, title: 'Vizit kart', price: '25₼', icon: '💳', category: 'Çap', active: true },
];

const glass = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '10px 14px',
  color: '#fff',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: '"DM Sans", sans-serif',
  transition: 'border-color 0.2s, background 0.2s',
};

export default function AdminProducts() {
  const [products, setProducts] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', price: '', icon: '🖨️', category: 'Çap' });
  const [focusedField, setFocusedField] = useState('');

  const addProduct = () => {
    if (form.title && form.price) {
      setProducts([...products, { ...form, id: Date.now(), active: true }]);
      setForm({ title: '', price: '', icon: '🖨️', category: 'Çap' });
      setShowForm(false);
    }
  };

  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
  const toggleActive = (id) => setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));

  return (
    <div style={{ padding: '40px 48px', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        ::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #1a1a2e; color: #fff; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.03em',
            background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}>Məhsullar</h1>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem', marginTop: 4 }}>
            Cəmi {products.length} məhsul
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm
              ? 'rgba(255,255,255,0.06)'
              : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            color: '#fff',
            border: showForm ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderRadius: '10px', padding: '10px 22px',
            fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem',
            fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {showForm ? 'Ləğv et' : '+ Yeni məhsul'}
        </button>
      </div>

      {/* ── FORM ── */}
      {showForm && (
        <div style={{ ...glass, padding: '28px', marginBottom: '24px' }}>
          <h3 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.3rem', letterSpacing: '0.05em',
            marginBottom: 20,
            background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Yeni məhsul əlavə et</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Ad', key: 'title', placeholder: 'Flayer' },
              { label: 'Qiymət', key: 'price', placeholder: '15₼' },
              { label: 'İkon', key: 'icon', placeholder: '🗞️' },
            ].map(f => (
              <div key={f.key}>
                <label style={{
                  display: 'block', fontSize: '0.65rem',
                  letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase', fontWeight: 600, marginBottom: 7,
                }}>{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  onFocus={() => setFocusedField(f.key)}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...inputStyle,
                    borderColor: focusedField === f.key ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.08)',
                    background: focusedField === f.key ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.04)',
                    boxShadow: focusedField === f.key ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none',
                  }}
                />
              </div>
            ))}

            <div>
              <label style={{
                display: 'block', fontSize: '0.65rem',
                letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', fontWeight: 600, marginBottom: 7,
              }}>Kateqoriya</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                }}
              >
                <option value="Çap">Çap</option>
                <option value="Reklam">Reklam</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={addProduct}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                color: '#fff', border: 'none', borderRadius: '8px',
                padding: '10px 22px', fontWeight: 600, cursor: 'pointer',
                fontSize: '0.82rem', fontFamily: '"DM Sans", sans-serif',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Əlavə et</button>

            <button
              onClick={() => setShowForm(false)}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
                padding: '10px 22px', cursor: 'pointer',
                fontSize: '0.82rem', fontFamily: '"DM Sans", sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
            >Ləğv et</button>
          </div>
        </div>
      )}

      {/* ── TABLE ── */}
      <div style={{
        ...glass,
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Məhsul', 'Kateqoriya', 'Qiymət', 'Status', 'Əməliyyat'].map(h => (
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
            {products.map(p => (
              <tr
                key={p.id}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Product */}
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '12px', flexShrink: 0,
                      background: 'rgba(139,92,246,0.1)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}>{p.icon}</div>
                    <span style={{ fontWeight: 500, fontSize: '0.88rem', color: '#fff' }}>{p.title}</span>
                  </div>
                </td>

                {/* Category */}
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px', padding: '3px 10px',
                    fontSize: '0.72rem', fontWeight: 500,
                  }}>{p.category}</span>
                </td>

                {/* Price */}
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{p.price}</span>
                </td>

                {/* Status */}
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    background: p.active ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                    color: p.active ? '#4ade80' : '#f87171',
                    border: `1px solid ${p.active ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                    borderRadius: '8px', padding: '4px 12px',
                    fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                  }}>
                    {p.active ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => toggleActive(p.id)}
                      style={{
                        background: 'rgba(245,158,11,0.1)',
                        color: '#fbbf24',
                        border: '1px solid rgba(245,158,11,0.2)',
                        borderRadius: '8px', padding: '6px 14px',
                        cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
                        fontFamily: '"DM Sans", sans-serif',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}
                    >
                      {p.active ? 'Deaktiv et' : 'Aktiv et'}
                    </button>

                    <button
                      onClick={() => deleteProduct(p.id)}
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        color: '#f87171',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '8px', padding: '6px 14px',
                        cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
                        fontFamily: '"DM Sans", sans-serif',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    >Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}