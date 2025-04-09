import { useEffect, useState } from 'react';
import { loginReducer, logoutReducer, setUser } from '@/store/slices/authSlice';
import { useAuthDispatch, useAuthSelector } from './store/hooks';
import { api } from './api/helper';
import { PageLoader } from '@/components/page-skeleton/PageLoader.tsx';
import { AuthState } from '@/store/store.ts';



export default function AuthInitializer({ children }: { children: React.ReactNode; }) {

  const [loading, setLoading] = useState(true);
  const dispatch = useAuthDispatch();
  const user = useAuthSelector((state: AuthState) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');

    token && dispatch(loginReducer({ token }))

    if(!token){
      setTimeout(()=>{
        setLoading(false)
        window.location.href ="/login"
      },500)
    }

    try {
        api('/user/me', {
          method:'GET'
        }).then((user) => {
          dispatch(setUser(user))
          setLoading(false);
        }).catch(() => {
          console.log('error trying to log in, show loader and remove token if ')
          setTimeout(()=> setLoading(false), 500)
          dispatch(logoutReducer());
          localStorage.removeItem('token')
        })

      } catch (err) {
      setTimeout(()=> setLoading(false), 500)
      localStorage.removeItem('token');
        dispatch(logoutReducer())
      }

  }, []);

  if (loading || !user) {
    return (
      <PageLoader />
    )
  }
  return <>{children}</>;
}
