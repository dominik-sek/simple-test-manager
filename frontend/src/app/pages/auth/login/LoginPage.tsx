import { login } from '@/api/login';
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

import { useEffect } from 'react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters",
  })
});




export default function LoginPage() {


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, []);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
    mode:"onChange"
    
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = await login(values.username, values.password)
      if (token) {
        localStorage.setItem("token", token.access_token)
        window.location.href = '/'
      }
    } catch (error: any) {
      
      const message = error?.message || "Something went wrong"
      form.setError('username', {})
      form.setError('password', {
        message: message
      })
      
    }
    
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
