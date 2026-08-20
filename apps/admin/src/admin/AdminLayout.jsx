import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { apiFetch } from './lib/api';
import '../admin/styles/adminUI.css';

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <AdminSidebar onLogout={logout} />
      <AdminHeader />

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}