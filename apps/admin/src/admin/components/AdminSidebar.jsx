import { NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Sifarişlər', icon: '📦' },
  { to: '/admin/products', label: 'Məhsullar', icon: '🗞️' },
  { to: '/admin/portfolio', label: 'Portfolio', icon: '🖼️' },
  { to: '/admin/customers', label: 'Müştərilər', icon: '👥' },
  { to: '/admin/blog', label: 'Blog', icon: '✍️' },
  { to: '/admin/messages', label: 'Mesajlar', icon: '💬' },
];

export default function AdminSidebar({ onLogout }) {
  return (
    <aside className="as-sidebar">
      <div className="as-brand">PrintShop <span>Admin</span></div>

      <nav className="as-nav" aria-label="Main">
        {menuItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `as-link${isActive ? ' active' : ''}`}
          >
            <span className="as-icon">{item.icon}</span>
            <span className="as-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="as-footer">
        <div className="as-user">
          <div className="as-avatar">A</div>
          <div>
            <div className="as-user-name">Admin</div>
            <div className="as-user-role">Administrator</div>
          </div>
        </div>

        <button className="as-logout" onClick={onLogout}>🚪 Çıxış</button>
      </div>
    </aside>
  );
}
