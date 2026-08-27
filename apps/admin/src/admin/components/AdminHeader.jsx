import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../lib/authService';
import { contactService } from '../lib/contactService';
import { orderService } from '../lib/orderService';
import { productService } from '../lib/productService';
import { customerService } from '../lib/customerService';
import { blogService } from '../lib/blogService';

function titleFromPath(path) {
  if (!path || path === '/') return 'Dashboard';
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 1 && parts[0] === 'admin') return 'Dashboard';
  return parts[parts.length - 1].replace(/-/g, ' ');
}

export default function AdminHeader({ onMenuClick }) {
  const loc = useLocation();
  const navigate = useNavigate();
  const title = titleFromPath(loc.pathname);

  const [admin, setAdmin] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const searchBoxRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    authService.me().then(setAdmin).catch(() => {});

    const loadCounts = () => {
      contactService
        .getAll({ unreadOnly: true, limit: 1 })
        .then(({ meta }) => setUnreadMessages(meta?.total || 0))
        .catch(() => {});
      orderService
        .getAll({ status: 'NEW', limit: 1 })
        .then(({ meta }) => setNewOrders(meta?.total || 0))
        .catch(() => {});
    };
    loadCounts();
    const interval = setInterval(loadCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) setResults(null);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults(null);
      return;
    }
    setSearching(true);
    const t = setTimeout(() => {
      Promise.all([
        productService.getAll({ search: q }).then((data) => data.slice(0, 4)).catch(() => []),
        orderService.getAll({ search: q, limit: 4 }).then((r) => r.data).catch(() => []),
        customerService.getAll({ search: q, limit: 4 }).then((r) => r.data).catch(() => []),
        blogService.getAll({ search: q, limit: 4 }).then((r) => r.data).catch(() => []),
      ]).then(([products, orders, customers, posts]) => {
        setResults({ products, orders, customers, posts });
        setSearching(false);
      });
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const goTo = (path) => {
    setResults(null);
    setQuery('');
    navigate(path);
  };

  const initial = admin?.name ? admin.name[0].toUpperCase() : 'A';
  const hasResults = results && (results.products.length || results.orders.length || results.customers.length || results.posts.length);
  const totalNotifications = unreadMessages + newOrders;

  return (
    <header className="ah-header">
      <div className="ah-left">
        <button className="ah-menu-toggle" onClick={onMenuClick} aria-label="Menyu">☰</button>
        <h2 className="ah-title">{title}</h2>
      </div>

      <div className="ah-right">
        <div className="ah-search-wrap" ref={searchBoxRef}>
          <input
            className="ah-search"
            placeholder="Axtar..."
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.trim().length >= 2 && (
            <div className="ah-search-dropdown">
              {searching ? (
                <div className="ah-search-empty">Axtarılır...</div>
              ) : !hasResults ? (
                <div className="ah-search-empty">Nəticə tapılmadı</div>
              ) : (
                <>
                  {results.products.length > 0 && (
                    <div className="ah-search-group">
                      <div className="ah-search-group-title">Məhsullar</div>
                      {results.products.map((p) => (
                        <div key={p.id} className="ah-search-item" onClick={() => goTo('/admin/products')}>
                          {p.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.orders.length > 0 && (
                    <div className="ah-search-group">
                      <div className="ah-search-group-title">Sifarişlər</div>
                      {results.orders.map((o) => (
                        <div key={o.id} className="ah-search-item" onClick={() => goTo('/admin/orders')}>
                          {o.customer.name} — {o.service || 'Sifariş'}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.customers.length > 0 && (
                    <div className="ah-search-group">
                      <div className="ah-search-group-title">Müştərilər</div>
                      {results.customers.map((c) => (
                        <div key={c.id} className="ah-search-item" onClick={() => goTo('/admin/customers')}>
                          {c.name} — {c.email}
                        </div>
                      ))}
                    </div>
                  )}
                  {results.posts.length > 0 && (
                    <div className="ah-search-group">
                      <div className="ah-search-group-title">Blog</div>
                      {results.posts.map((p) => (
                        <div key={p.id} className="ah-search-item" onClick={() => goTo('/admin/blog')}>
                          {p.title}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="ah-notif-wrap" ref={notifRef}>
          <button className="ah-icon" aria-label="Notifications" onClick={() => setNotifOpen((v) => !v)}>
            🔔
            {totalNotifications > 0 && <span className="ah-notif-dot">{totalNotifications}</span>}
          </button>
          {notifOpen && (
            <div className="ah-notif-dropdown">
              {totalNotifications === 0 ? (
                <div className="ah-search-empty">Bildiriş yoxdur</div>
              ) : (
                <>
                  {unreadMessages > 0 && (
                    <div className="ah-search-item" onClick={() => goTo('/admin/messages')}>
                      💬 {unreadMessages} oxunmamış mesaj
                    </div>
                  )}
                  {newOrders > 0 && (
                    <div className="ah-search-item" onClick={() => goTo('/admin/orders')}>
                      📦 {newOrders} yeni sifariş
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="ah-profile" title={admin?.email || ''}>{initial}</div>
      </div>
    </header>
  );
}
