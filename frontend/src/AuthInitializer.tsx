import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginReducer, logoutReducer, setUser } from '@/store/slices/authSlice';
import {jwtDecode} from 'jwt-decode';
import { useAuthDispatch } from './store/hooks';
import { api } from './api/helper';

interface DecodedToken {
  id: number;
  email: string;
  role: string;
}

export default function AuthInitializer({ children }: { children: React.ReactNode; }) {
  console.log('AuthInitializer')
  const [loading, setLoading] = useState(true);

  const dispatch = useAuthDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        dispatch(loginReducer({ token }));

        api('/user/me', {
          method:'GET'
        }).then((user) => {
          dispatch(setUser(user))
        }).catch((err) => {
          dispatch(logoutReducer());
          localStorage.removeItem('token')
        }).finally(() => {
          setLoading(false)
        })
        

      } catch (err) {
        console.warn('Invalid token in localStorage');
        localStorage.removeItem('token');
        dispatch(logoutReducer())
        setLoading(false);

      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null; // Or show a loading spinner
  return <>{children}</>;
}
