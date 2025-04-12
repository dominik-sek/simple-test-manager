import { useAuthSelector } from '@/store/hooks';
import { DecodedToken } from '@/types/DecodedToken';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const user = useAuthSelector((state) => state.auth.user);
  const token = localStorage.getItem('token');

  let isExpired = false;
  let decodedToken = null;

  // Check token validity
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
  console.log(user);
  // Determine logged in status - require both valid token and user data
  const isLoggedIn = Boolean(token && !isExpired && user);

  return {
    isLoggedIn,
    isExpired,
    user,  // Return the full user object for convenience
    role: user?.role || null,
    token,  // Could be useful to access in some cases
    tokenData: decodedToken  // Access to decoded token data if needed
  };
};