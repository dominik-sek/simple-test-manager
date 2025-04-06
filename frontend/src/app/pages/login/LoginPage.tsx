import { login } from '@/api/login';
import { use, useEffect, useState } from 'react';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }
  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = await login(email, password);
    if (token) {
      localStorage.setItem('token', token.access_token);
      window.location.href = '/';
    } else {
      alert('Invalid credentials');
    }

    console.log(email, password);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, [])



  return(
    <div className='h-screen w-screen flex items-center justify-center bg-slate-200'>
      <form className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-3xl font-bold text-slate-700'>Login</h1>
        <p className='text-slate-500'>Please enter your credentials</p>
        <input onChange={(e) => handleEmailChange(e)} id='email' type="email" placeholder="Email" className='h-10 w-64 rounded-lg bg-slate-100 p-2 mb-4' />
        <input onChange={(e) => handlePasswordChange(e)} id='password' type="password" placeholder="Password" className='h-10 w-64 rounded-lg bg-slate-100 p-2 mb-4' />
        
        <button type='submit' onClick={(e) => handleLogin(e)} className='h-10 w-64 rounded-lg bg-palette-green text-white font-bold hover:bg-palette-green/80 transition-all duration-200 ease-in-out'>Login</button>

        <p className='text-slate-500'>Don't have an account? <a href="/register" className='text-palette-green font-bold'>Register</a></p>
        <p className='text-slate-500'>Forgot your password? <a href="/reset-password" className='text-palette-green font-bold'>Reset Password</a></p>
        <p className='text-slate-500'>Or login with</p>

        <div className='flex items-center justify-center gap-2'>  
          <button className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-palette-green/20 transition-all duration-200 ease-in-out'>
            <img src="/google-icon.png" alt="Google" className='h-6 w-6' />
          </button>

          <button className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-palette-green/20 transition-all duration-200 ease-in-out'>
            <img src="/github-icon.png" alt="GitHub" className='h-6 w-6' />
          </button>
        </div>

        <p className='text-slate-500'>By logging in, you agree to our <a href="/terms" className='text-palette-green font-bold'>Terms of Service</a> and <a href="/privacy" className='text-palette-green font-bold'>Privacy Policy</a>.</p>

      </form>
    </div>
  )
}
