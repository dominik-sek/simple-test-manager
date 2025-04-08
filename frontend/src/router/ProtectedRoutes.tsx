import { Navigate, Outlet } from "react-router";
import { useAuth } from '@/app/hooks/useAuth';

const ProtectedRoutes = () => {
  
  const auth = useAuth()
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
  
};

export default ProtectedRoutes;
