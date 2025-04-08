import { useAuthSelector } from '@/store/hooks';
import { DecodedToken } from '@/types/DecodedToken';
import { jwtDecode } from 'jwt-decode';


export const useAuth = () => {
  const user = useAuthSelector((state) => state.auth.decodedToken)
  const token = useAuthSelector((state) => state.auth.token)
  console.log(user)
  console.log(token)
  let isExpired = false;
  
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      isExpired = decoded.exp < currentTime;
    } catch (error) {
      isExpired = true;
    }
  }
  const isLoggedIn = !isExpired

  return {
    isLoggedIn,
    isExpired,
    role: user?.role || null
  }
}
