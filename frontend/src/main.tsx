import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './app/index.css'
import { RouterProvider } from 'react-router';
import { router } from '@/router/app-routes.tsx';
import { Provider } from 'react-redux';
import {store} from './store/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>

)
