import { api } from '@/api/helper';
import { useAuthDispatch } from '@/store/hooks';
import { logoutReducer } from '@/store/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


export default function Logout() {
  const navigate = useNavigate()
  const dispatch = useAuthDispatch();


  useEffect(() => { 
    localStorage.removeItem("token");  
    dispatch(logoutReducer())
    navigate('/login')

    api('/auth/logout', { method: 'POST' })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error('Failed to logout:', err);
      });
  }, []);

  return null;
  
}
