import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Sifarişlər', icon: '📦' },
  { to: '/admin/products', label: 'Məhsullar', icon: '🗞️' },
  { to: '/admin/customers', label: 'Müştərilər', icon: '👥' },
  { to: '/admin/blog', label: 'Blog', icon: '✍️' },
  { to: '/admin/messages', label: 'Mesajlar', icon: '💬' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#060608',
      fontFamily: '"DM Sans", sans-serif',
    }}>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes float1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-30px) scale(1.06); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-15px,20px) scale(1.04); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          margin-bottom: 4px;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid transparent;
          position: relative;
        }
        .admin-nav-link:hover {
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.06);
        }
        .admin-nav-link.active {
          color: #fff;
          background: rgba(139,92,246,0.15);
          border-color: rgba(139,92,246,0.3);
          font-weight: 600;
        }
        .admin-nav-link .nav-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          background: rgba(255,255,255,0.05);
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .admin-nav-link.active .nav-icon {
          background: rgba(139,92,246,0.2);
        }
      `}</style>

      {/* ── AMBIENT BLOBS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          top: '-100px', left: '100px',
          animation: 'float1 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
          bottom: '10%', right: '10%',
          animation: 'float2 18s ease-in-out infinite',
        }} />
      </div>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 240,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{
          padding: '28px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.4rem', letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #8b5cf6, #a78bfa, #ec4899)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}>PrintShop</div>
          <div style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.62rem', marginTop: 4,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {menuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              background: 'rgba(239,68,68,0.08)',
              color: 'rgba(239,68,68,0.6)',
              border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: '12px', padding: '10px',
              cursor: 'pointer', fontSize: '0.82rem',
              fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s', letterSpacing: '0.03em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
              e.currentTarget.style.color = '#f87171';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
              e.currentTarget.style.color = 'rgba(239,68,68,0.6)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)';
            }}
          >
            🚪 Çıxış
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        marginLeft: 240, flex: 1,
        overflow: 'auto', position: 'relative', zIndex: 1,
      }}>
        <Outlet />
      </div>
    </div>
  );
}