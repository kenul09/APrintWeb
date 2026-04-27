import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (form.email === 'admin@printshop.az' && form.password === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Email və ya şifrə yanlışdır');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060608',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"DM Sans", sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes float1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.08); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-20px,30px) scale(1.05); }
        }
        @keyframes float3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(15px,20px) scale(1.06); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* ── AMBIENT BLOBS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          top: '-150px', left: '-100px',
          animation: 'float1 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
          bottom: '-80px', right: '-80px',
          animation: 'float2 15s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          top: '40%', right: '20%',
          animation: 'float3 18s ease-in-out infinite',
        }} />
      </div>

      {/* ── CARD ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '28px',
        padding: '52px 44px',
        width: 420,
        animation: 'fadeUp 0.7s ease both',
        boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)',
      }}>
        {/* Glow inside card */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.12), transparent 60%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '20px', margin: '0 auto 20px',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2))',
              border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 8px 24px rgba(139,92,246,0.2)',
            }}>🖨️</div>

            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
              marginBottom: 6,
            }}>PrintShop Admin</h1>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.83rem' }}>
              Admin panelinə daxil olun
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '12px', padding: '12px 16px',
              color: '#f87171', fontSize: '0.83rem',
              marginBottom: '20px', textAlign: 'center',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Inputs */}
          {[
            { label: 'Email', key: 'email', type: 'email', placeholder: 'admin@printshop.az' },
            { label: 'Şifrə', key: 'password', type: 'password', placeholder: '••••••••' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block', fontSize: '0.65rem',
                letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', fontWeight: 600, marginBottom: 8,
              }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                onFocus={() => setFocused(f.key)}
                onBlur={() => setFocused('')}
                style={{
                  width: '100%',
                  background: focused === f.key ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${focused === f.key ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '12px', padding: '14px 18px',
                  color: '#fff', fontSize: '0.88rem', outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: '"DM Sans", sans-serif',
                  boxShadow: focused === f.key ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
                  transition: 'all 0.2s',
                }}
              />
            </div>
          ))}

          {/* Button */}
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: '#fff', border: 'none', borderRadius: '14px',
              padding: '15px', fontWeight: 700,
              cursor: 'pointer', fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: '"DM Sans", sans-serif',
              marginTop: '8px',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 8px 24px rgba(139,92,246,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Daxil ol →
          </button>

          {/* Demo hint */}
          <p style={{
            textAlign: 'center', marginTop: '24px',
            color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem',
            lineHeight: 1.7,
          }}>
            Demo: admin@printshop.az / admin123
          </p>
        </div>
      </div>
    </div>
  );
}