import { useEffect, useState } from 'react';
import { api } from '@/api/helper.ts';

export const usePing = (retries = 5, delay = 1000) =>{

  const [error, setError] = useState<Error | null>(null);
  const [isAlive, setIsAlive] = useState<boolean>(false);

useEffect(()=>{
  api('/', {method: 'GET'}).then((res:{status: string})=>{
    if(res.status === "ok"){
      console.log(res)
      setIsAlive(true);
    }
  }).catch(error=>{
    setError(error);
    setIsAlive(false);
  })
})
  return {error, isAlive}
}

