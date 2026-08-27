import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { apiFetch } from './lib/api';
import { authService } from './lib/authService';
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