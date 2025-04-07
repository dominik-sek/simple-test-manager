import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
  console.log('going through protected routes')

  const localStorageToken = localStorage.getItem("token");
  if(!localStorageToken) {
    return <Navigate to="/login" replace />;
  }

  const decoded = localStorageToken ? jwtDecode(localStorageToken) : null;
  
  const isExpired = (decoded: any) => {
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  if (isExpired(decoded)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
  
};

export default ProtectedRoutes;
