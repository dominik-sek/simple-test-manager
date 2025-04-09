import { useEffect, useState } from 'react';
import { loginReducer, logoutReducer, setUser } from '@/store/slices/authSlice';
import { useAuthDispatch } from './store/hooks';
import { api } from './api/helper';



export default function AuthInitializer({ children }: { children: React.ReactNode; }) {
  console.log('AuthInitializer')
  const [loading, setLoading] = useState(true);
  const dispatch = useAuthDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    token && dispatch(loginReducer({ token }))

    if(!token) window.location.href ="/login"

    try {

        api('/user/me', {
          method:'GET'
        }).then((user) => {
          dispatch(setUser(user))
        }).catch(() => {
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

  }, []);

  if (loading) return null; // Or show a loading spinner
  return <>{children}</>;
}
