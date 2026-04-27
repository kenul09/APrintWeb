import { useState } from 'react';

const initial = [
  { id: 1, title: 'Effektiv flayer dizaynının sirləri', date: '10 Mar 2026', published: true },
  { id: 2, title: 'Vizit kart üçün ən yaxşı kağız növləri', date: '5 Mar 2026', published: true },
  { id: 3, title: 'Banner ölçüləri: Hansını seçməli?', date: '1 Mar 2026', published: false },
];

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#fff',
  fontSize: '0.88rem',
  outline: 'none',
  marginBottom: '16px',
  boxSizing: 'border-box',
  fontFamily: '"DM Sans", sans-serif',
  transition: 'border-color 0.2s, background 0.2s',
};

export default function AdminBlog() {
  const [posts, setPosts] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [focused, setFocused] = useState(false);

  const addPost = () => {
    if (title) {
      setPosts([...posts, { id: Date.now(), title, date: '20 Mar 2026', published: false }]);
      setTitle('');
      setShowForm(false);
    }
  };

  const toggle = (id) => setPosts(posts.map(p => p.id === id ? { ...p, published: !p.published } : p));
  const del = (id) => setPosts(posts.filter(p => p.id !== id));

  return (
    <div style={{ padding: '40px 48px', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        ::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.03em',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}>Blog</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm
              ? 'rgba(255,255,255,0.06)'
              : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            color: '#fff', border: showForm ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderRadius: '10px', padding: '10px 22px',
            fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem',
            fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {showForm ? 'Ləğv et' : '+ Yeni post'}
        </button>
      </div>

      {/* ── FORM ── */}
      {showForm && (
        <div style={{ ...glass, padding: '24px', marginBottom: '20px' }}>
          <input
            placeholder="Post başlığı..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              ...inputStyle,
              borderColor: focused ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.08)',
              background: focused ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.04)',
              boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none',
            }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={addPost}
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

      {/* ── LIST ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {posts.map(p => (
          <div
            key={p.id}
            style={{
              ...glass,
              padding: '20px 24px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div>
              <div style={{ fontWeight: 500, marginBottom: '4px', fontSize: '0.9rem', color: '#fff' }}>{p.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>{p.date}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{
                background: p.published ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.05)',
                color: p.published ? '#4ade80' : 'rgba(255,255,255,0.3)',
                border: `1px solid ${p.published ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '6px', padding: '4px 10px',
                fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em',
              }}>
                {p.published ? 'Yayımlandı' : 'Draft'}
              </span>

              <button
                onClick={() => toggle(p.id)}
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
                {p.published ? 'Gizlət' : 'Yayımla'}
              </button>

              <button
                onClick={() => del(p.id)}
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
          </div>
        ))}
      </div>
    </div>
  );
}