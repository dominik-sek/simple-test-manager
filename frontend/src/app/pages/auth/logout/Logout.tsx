import { api } from '@/api/helper';
import { useEffect } from 'react';
import { Navigate } from 'react-router';


export default function Logout() {
  
  localStorage.removeItem("token");  

  useEffect(() => { 
    api('/auth/logout', { method: 'POST' })
      .then((res) => {
        console.log(res); // good for debugging
      })
      .catch((err) => {
        console.error('Failed to logout:', err);
      });
  }, []);


  return <Navigate to="/login" replace />;
  
}
