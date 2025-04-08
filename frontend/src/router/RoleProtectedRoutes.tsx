import { useAuth } from '@/app/hooks/useAuth';
import { Navigate, Outlet } from "react-router";

interface RoleProtectedRoutesProps {
  allowedRoles: string[];
}
const RoleProtectedRoutes = ({ allowedRoles }: RoleProtectedRoutesProps) => {
  const { role, isLoggedIn } = useAuth()
  
  if (!isLoggedIn || !role) return <Navigate to="/" replace />
  console.log(allowedRoles.includes(role))
	return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/"  replace />;
};

export default RoleProtectedRoutes;
