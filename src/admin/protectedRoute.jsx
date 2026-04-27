import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('admin_auth');
  return isAuth ? children : <Navigate to="/admin/login" />;
}