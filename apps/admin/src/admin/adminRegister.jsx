import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from './lib/authService';

export default function AdminRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    if (!form.name.trim()) {
      setError('Ad Soyad tələb olunur');
      return;
    }
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
      // apps/backend (:5001) is the real, current admin auth system — this
      // is deliberately NOT the legacy apps/client cookie-session route,
      // which only ever allowed a single self-registered admin.
      await authService.register(form.name.trim(), form.email, form.password);
      setSuccess(true);
      setTimeout(() => navigate('/admin/login'), 1200);
    } catch (err) {
      // status 0 = backendFetch couldn't reach the server at all (network
      // failure), as opposed to a normal JSON error response from it.
      setError(err.status === 0 ? 'Serverlə əlaqə qurmaq mümkün olmadı.' : err.message);
    } finally {
      setSubmitting(false);
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
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
              animation: 'shimmer 4s linear infinite',
              marginBottom: 6,
            }}>PrintShop Admin</h1>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.83rem' }}>
              Yeni hesab yaradın
            </p>
          </div>

          {success ? (
            <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 18px',
                background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', color: '#a78bfa',
              }}>✓</div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: 6 }}>
                Qeydiyyat uğurla tamamlandı
              </p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.83rem' }}>
                Daxil olma səhifəsinə yönləndirilirsiniz…
              </p>
            </div>
          ) : (
          <>
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
            { label: 'Ad Soyad', key: 'name', type: 'text', placeholder: 'Əli Həsənov' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'admin@printshop.az' },
            { label: 'Şifrə', key: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Şifrəni təsdiqlə', key: 'confirm', type: 'password', placeholder: '••••••••' },
          ].map(f => {
            const isPassword = f.type === 'password';
            const revealed = !!visiblePasswords[f.key];
            return (
            <div key={f.key} style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block', fontSize: '0.65rem',
                letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', fontWeight: 600, marginBottom: 8,
              }}>{f.label}</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={isPassword ? (revealed ? 'text' : 'password') : f.type}
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
                    borderRadius: '12px', padding: isPassword ? '14px 44px 14px 18px' : '14px 18px',
                    color: '#fff', fontSize: '0.88rem', outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: '"DM Sans", sans-serif',
                    boxShadow: focused === f.key ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
                    transition: 'all 0.2s',
                  }}
                />
                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setVisiblePasswords(prev => ({ ...prev, [f.key]: !prev[f.key] }))}
                    aria-label={revealed ? 'Şifrəni gizlət' : 'Şifrəni göstər'}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'transparent', border: 'none', padding: 0,
                      cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
                      color: 'rgba(255,255,255,0.35)',
                      display: 'flex', alignItems: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                  >
                    {revealed ? '🙈' : '👁️'}
                  </button>
                )}
              </div>
            </div>
            );
          })}

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
          </>
          )}
        </div>
      </div>
    </div>
  );
}
