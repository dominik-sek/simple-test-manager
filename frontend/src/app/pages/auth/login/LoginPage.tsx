import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuthDispatch } from '@/store/hooks';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { useEffect } from 'react';
import {useNavigate} from 'react-router';
import { api } from '@/api/helper.ts';
import { setUser } from '@/store/slices/authSlice.ts';
import { PageLoader } from '@/components/page-skeleton/PageLoader.tsx';

export default function LoginPage() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth()

  useEffect(()=>{
      if(isLoggedIn){
        navigate('/', { replace: true } )
      }
  },[isLoggedIn, navigate])


  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters",
    })
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
    
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const token = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        })
      })
      localStorage.setItem("token", token.access_token)

      const userData = await api('/user/me', {
        method:'GET'
      })

      dispatch(setUser(userData))
      //navigate('/')
    } catch (error: any) {
      
      const message = error?.message || "Something went wrong"
      form.setError('username', {})
      form.setError('password', {
        message: message
      })
    }
  }
  if(isLoggedIn){
    return <PageLoader />
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-slate-200'>


      <Form {...form}>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-2'>

        <h1 className='text-3xl font-bold text-slate-700 mb-5'>Login</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="h-10 w-64 bg-slate-100" placeholder='Username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="h-10 w-64 bg-slate-100" placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

          />


          <Button disabled={form.formState.isSubmitting} className='w-64 bg-palette-green/80 cursor-pointer hover:bg-palette-green' type="submit">{form.formState.isSubmitting ? 'Logging in...' : 'Login'}</Button>
          <p className='text-slate-500'>Don't have an account? <a href="/register" className='text-palette-green font-bold'>Register</a></p>
          <p className='text-slate-500'>Forgot your password? <a href="/reset-password" className='text-palette-green font-bold'>Reset Password</a></p>

        </form>
      </Form>
    </div>
  );
}
