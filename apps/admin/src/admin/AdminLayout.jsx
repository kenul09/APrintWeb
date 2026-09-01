import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { apiFetch } from './lib/api';
import { authService } from './lib/authService';
import { UNAUTHORIZED_EVENT } from './lib/backend';
import '../admin/styles/adminUI.css';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    authService.logout();
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      navigate('/admin/login');
    }
  };

  // Any backend request that comes back 401 while a token was attached means
  // the session died server-side (expired/invalid JWT) — bounce to login
  // immediately instead of leaving the admin stuck on a page that will keep
  // failing every request with a token that's already been cleared.
  useEffect(() => {
    const onUnauthorized = () => navigate('/admin/login');
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <AdminSidebar onLogout={logout} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AdminHeader onMenuClick={() => setSidebarOpen((v) => !v)} />

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}