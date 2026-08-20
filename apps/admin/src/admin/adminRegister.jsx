import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from './lib/api';

export default function AdminRegister() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    apiFetch('/api/auth/register')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.available) navigate('/admin/login', { replace: true });
        else setChecking(false);
      })
      .catch(() => {
        if (!cancelled) navigate('/admin/login', { replace: true });
      });
    return () => { cancelled = true; };
  }, [navigate]);

  const handleRegister = async () => {
    setError('');
    if (form.password.length < 8) {
      setError('Şifrə ən azı 8 simvol olmalıdır');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Şifrələr uyğun gəlmir');
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (res.ok) {
        navigate('/admin');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Qeydiyyat mümkün olmadı');
      }
    } catch {
      setError('Serverə qoşulmaq mümkün olmadı');
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) return null;

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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

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
      </div>

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
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.12), transparent 60%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
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
              marginBottom: 6,
            }}>İlk admin hesabı</h1>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.83rem' }}>
              Qeydiyyatdan keçin və admin panelinə daxil olun
            </p>
          </div>

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

          {[
            { label: 'Email', key: 'email', type: 'email', placeholder: 'admin@printshop.az' },
            { label: 'Şifrə', key: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Şifrəni təsdiqlə', key: 'confirm', type: 'password', placeholder: '••••••••' },
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
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
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

          <button
            onClick={handleRegister}
            disabled={submitting}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: '#fff', border: 'none', borderRadius: '14px',
              padding: '15px', fontWeight: 700,
              cursor: submitting ? 'default' : 'pointer', fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: '"DM Sans", sans-serif',
              marginTop: '8px',
              opacity: submitting ? 0.7 : 1,
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 8px 24px rgba(139,92,246,0.3)',
            }}
            onMouseEnter={e => { if (!submitting) { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
            onMouseLeave={e => { if (!submitting) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; } }}
          >
            {submitting ? 'Yaradılır…' : 'Qeydiyyatdan keç →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            Artıq hesabınız var?{' '}
            <Link to="/admin/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>
              Daxil olun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
