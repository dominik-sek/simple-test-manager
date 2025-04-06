import { createBrowserRouter } from 'react-router';
import TestProjects from '@/app/pages/projects/TestProjects';
import TestCases from '@/app/pages/cases/TestCases';
import TestRuns from '@/app/pages/runs/TestRuns';
import AdminHome from '@/app/pages/admin/AdminHome';
import Reports from '@/app/pages/reports/Reports';
import Home from '@/app/pages/dashboard/Home';
import LoginPage from '@/app/pages/login/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import RoleProtectedRoutes from './RoleProtectedRoutes';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <LoginPage />
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/projects',
        element: <TestProjects />
      },
      {
        path: '/cases',
        element: <TestCases />
      },
      {
        path: '/runs',
        element: <TestRuns />
      },
      {
        path: '/reports',
        element: <Reports />
      },
      {
        element: <RoleProtectedRoutes allowedRoles={['admin', 'tester']} />,
        children: [
          {
            path: '/admin',
            element: <AdminHome />
          }
        ]
      }

    ]
  }
  

])
