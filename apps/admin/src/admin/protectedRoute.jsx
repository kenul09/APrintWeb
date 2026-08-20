import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiFetch } from './lib/api';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;
    apiFetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setStatus(data.authenticated ? 'authenticated' : 'anonymous');
      })
      .catch(() => {
        if (!cancelled) setStatus('anonymous');
      });
    return () => { cancelled = true; };
  }, []);

  if (status === 'checking') return null;
  return status === 'authenticated' ? children : <Navigate to="/admin/login" />;
}
