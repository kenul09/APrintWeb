import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from './lib/authService';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;
    authService.me().then((user) => {
      if (!cancelled) setStatus(user ? 'authenticated' : 'anonymous');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'checking') return null;
  return status === 'authenticated' ? children : <Navigate to="/admin/login" />;
}
