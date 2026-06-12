import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

export function ProtectedReaderRoute() {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate replace state={{ from: location.pathname }} to="/auth" />;
  }

  return <Outlet />;
}
