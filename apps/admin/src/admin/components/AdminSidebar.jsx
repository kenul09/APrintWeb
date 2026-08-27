import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authService } from '../lib/authService';
import { contactService } from '../lib/contactService';

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Sifarişlər', icon: '📦' },
  { to: '/admin/products', label: 'Məhsullar', icon: '🗞️' },
  { to: '/admin/portfolio', label: 'Portfolio', icon: '🖼️' },
  { to: '/admin/customers', label: 'Müştərilər', icon: '👥' },
  { to: '/admin/blog', label: 'Blog', icon: '✍️' },
  { to: '/admin/messages', label: 'Mesajlar', icon: '💬' },
];

export default function AdminSidebar({ onLogout, open, onClose }) {
  const [admin, setAdmin] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    authService.me().then(setAdmin).catch(() => {});

    const loadUnread = () => {
      contactService
        .getAll({ unreadOnly: true, limit: 1 })
        .then(({ meta }) => setUnreadCount(meta?.total || 0))
        .catch(() => {});
    };
    loadUnread();
    const interval = setInterval(loadUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  const initial = admin?.name ? admin.name[0].toUpperCase() : 'A';

  return (
    <>
      {open && <div className="as-overlay" onClick={onClose} aria-hidden="true" />}

      <aside className={`as-sidebar${open ? ' as-sidebar-open' : ''}`}>
        <div className="as-brand">PrintShop <span>Admin</span></div>

        <nav className="as-nav" aria-label="Main">
          {menuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => `as-link${isActive ? ' active' : ''}`}
            >
              <span className="as-icon">{item.icon}</span>
              <span className="as-label">{item.label}</span>
              {item.to === '/admin/messages' && unreadCount > 0 && (
                <span className="as-badge">{unreadCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="as-footer">
          <div className="as-user">
            <div className="as-avatar">{initial}</div>
            <div>
              <div className="as-user-name">{admin?.name || 'Admin'}</div>
              <div className="as-user-role">{admin?.role === 'ADMIN' ? 'Administrator' : admin?.email || ''}</div>
            </div>
          </div>

          <button className="as-logout" onClick={onLogout}>🚪 Çıxış</button>
        </div>
      </aside>
    </>
  );
}
