import { useEffect, useState } from 'react';
import { useAuthDispatch } from '@/store/hooks';
import { setUser, logoutReducer } from '@/store/slices/authSlice';
import { api } from '@/api/helper';
import { jwtDecode } from 'jwt-decode';
import { PageLoader } from '@/components/page-loaders/PageLoader';
import InlineLoader from '@/components/page-loaders/InlineLoader';


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('user provider')
    const token = localStorage.getItem('token');
    if (!token) return setLoading(false);

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        dispatch(logoutReducer());
        return setLoading(false);
      }

      api('/user/me')
        .then((data) => dispatch(setUser(data)))
        .catch(() => {
          localStorage.removeItem('token');
          dispatch(logoutReducer());
        })
        .finally(() => setLoading(false));

    } catch (err) {
      localStorage.removeItem('token');
      dispatch(logoutReducer());
      setLoading(false);
    }
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      {loading ? (
        <InlineLoader />
      ) : (
          children
      )}
      
    </>
  )
  
};
