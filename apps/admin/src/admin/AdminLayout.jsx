import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import '../admin/styles/adminUI.css';

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
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