import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import { RouterProvider } from 'react-router';
import { router } from '@/router/app-routes.tsx';
import { Provider } from 'react-redux';
import {store} from './store/store';
import AuthInitializer from './AuthInitializer';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
      </Provider>
  </StrictMode>

)
