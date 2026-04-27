import { useState } from 'react';

const initial = [
  { id: 1, name: 'Əli Həsənov', email: 'ali@gmail.com', service: 'Flayer', message: '500 ədəd A4 flayer lazımdır. Qiymət necədir?', date: '11 Mar', read: false },
  { id: 2, name: 'Leyla Əliyeva', email: 'leyla@gmail.com', service: 'Banner', message: '3x1 metr banner istəyirəm. Neçə günə hazır olar?', date: '10 Mar', read: false },
  { id: 3, name: 'Murad Quliyev', email: 'murad@gmail.com', service: 'Vizit kart', message: 'Şirkətimiz üçün 200 ədəd vizit kart lazımdır.', date: '9 Mar', read: true },
];

const glass = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
};

export default function AdminMessages() {
  const [messages, setMessages] = useState(initial);
  const [selected, setSelected] = useState(null);

  const markRead = (id) => setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  const del = (id) => { setMessages(messages.filter(m => m.id !== id)); if (selected?.id === id) setSelected(null); };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div style={{ padding: '40px 48px', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.03em',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}>Mesajlar</h1>

        {unreadCount > 0 && (
          <span style={{
            background: 'linear-gradient(135deg, #ef4444, #f87171)',
            color: '#fff', borderRadius: '50px',
            padding: '3px 12px', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.06em', boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            {unreadCount} yeni
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* ── MESSAGE LIST ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {messages.map(m => (
            <div
              key={m.id}
              onClick={() => { setSelected(m); markRead(m.id); }}
              style={{
                ...glass,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selected?.id === m.id
                  ? 'rgba(139,92,246,0.12)'
                  : 'rgba(255,255,255,0.03)',
                borderColor: selected?.id === m.id
                  ? 'rgba(139,92,246,0.35)'
                  : 'rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                if (selected?.id !== m.id) {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                }
              }}
              onMouseLeave={e => {
                if (selected?.id !== m.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{
                  fontWeight: m.read ? 400 : 600,
                  fontSize: '0.88rem',
                  color: m.read ? 'rgba(255,255,255,0.7)' : '#fff',
                }}>{m.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>{m.date}</span>
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {!m.read && (
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    display: 'inline-block', boxShadow: '0 0 6px rgba(139,92,246,0.6)',
                  }} />
                )}
                {m.message}
              </div>
            </div>
          ))}
        </div>

        {/* ── MESSAGE DETAIL ── */}
        <div>
          {selected ? (
            <div style={{ ...glass, padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: 4, fontSize: '1rem', color: '#fff' }}>{selected.name}</h3>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>{selected.email}</div>
                </div>
                <span style={{
                  background: 'rgba(139,92,246,0.15)',
                  color: '#a78bfa',
                  border: '1px solid rgba(139,92,246,0.25)',
                  borderRadius: '8px', padding: '4px 12px',
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                }}>{selected.service}</span>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '20px',
                color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem',
                lineHeight: 1.75, marginBottom: 24,
              }}>
                {selected.message}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    color: '#fff', border: 'none', borderRadius: '10px',
                    padding: '10px 22px', fontWeight: 600, cursor: 'pointer',
                    fontSize: '0.82rem', fontFamily: '"DM Sans", sans-serif',
                    letterSpacing: '0.05em', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >📧 Cavabla</button>

                <button
                  onClick={() => del(selected.id)}
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    color: '#f87171',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: '10px', padding: '10px 20px',
                    fontWeight: 600, cursor: 'pointer',
                    fontSize: '0.82rem', fontFamily: '"DM Sans", sans-serif',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                >Sil</button>
              </div>
            </div>
          ) : (
            <div style={{
              ...glass,
              padding: '64px 48px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.4 }}>💬</div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>Mesaj seçin</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}