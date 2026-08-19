import { useLocation } from 'react-router-dom';

function titleFromPath(path) {
  if (!path || path === '/') return 'Dashboard';
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 1 && parts[0] === 'admin') return 'Dashboard';
  return parts[parts.length - 1].replace(/-/g, ' ');
}

export default function AdminHeader() {
  const loc = useLocation();
  const title = titleFromPath(loc.pathname);

  return (
    <header className="ah-header">
      <div className="ah-left">
        <h2 className="ah-title">{title}</h2>
      </div>

      <div className="ah-right">
        <input className="ah-search" placeholder="Search..." aria-label="Search" />
        <button className="ah-icon" aria-label="Notifications">🔔</button>
        <div className="ah-profile">A</div>
      </div>
    </header>
  );
}
