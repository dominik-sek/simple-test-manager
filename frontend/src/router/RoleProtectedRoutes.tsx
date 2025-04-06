import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from "react-router";

interface RoleProtectedRoutesProps {
  allowedRoles: string[];
}
const RoleProtectedRoutes = ({ allowedRoles }: RoleProtectedRoutesProps) => {
  console.log('going through role protected routes')
  const localStorageToken = localStorage.getItem("token");
  const decoded = localStorageToken ? jwtDecode(localStorageToken) : null;

  const isValidRole = (decoded: any) => {
    return allowedRoles.includes(decoded.role);
  };
  
  
	return isValidRole(decoded) ? <Outlet /> : <Navigate to="/"  replace />;
};

export default RoleProtectedRoutes;
