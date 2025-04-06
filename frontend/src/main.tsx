import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { router } from '@/router/app-routes.tsx';



createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

)
