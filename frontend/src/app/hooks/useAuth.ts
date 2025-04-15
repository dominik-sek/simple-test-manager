import { useAuthSelector } from '@/store/hooks';
import { DecodedToken } from '@/types/DecodedToken';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const user = useAuthSelector((state) => state.auth.user);
  const token = localStorage.getItem('token');

  let isExpired = false;
  let decodedToken = null;

  if (token) {
    try {
      decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      isExpired = decodedToken.exp < currentTime;

    } catch (error) {
      console.error('Token decode error:', error);
      isExpired = true;
    }
  }
  const isLoggedIn = Boolean(token && !isExpired && user);

  return {
    isLoggedIn,
    isExpired,
    user,  
    role: user?.role || null,
    token,  
    tokenData: decodedToken 
  };
};
