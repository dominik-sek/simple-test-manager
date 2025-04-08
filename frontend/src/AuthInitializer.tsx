import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginReducer } from '@/store/slices/authSlice';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  id: number;
  email: string;
  role: string;
}

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        dispatch(loginReducer({ token }));
      } catch (err) {
        console.warn('Invalid token in localStorage');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  if (loading) return null; // Or show a loading spinner
  return <>{children}</>;
}
