import { useAuth } from '@/app/hooks/useAuth';
import { Navigate, Outlet } from "react-router";

interface RoleProtectedRoutesProps {
  allowedRoles: string[];
}
const RoleProtectedRoutes = ({ allowedRoles }: RoleProtectedRoutesProps) => {
  const { role, isLoggedIn } = useAuth()
  console.log('role protectedRoutes', role, isLoggedIn)
  if (!isLoggedIn || !role) return <Navigate to="/" replace />

	return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/"  replace />;
};

export default RoleProtectedRoutes;
