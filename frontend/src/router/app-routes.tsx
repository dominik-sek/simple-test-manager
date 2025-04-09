import { createBrowserRouter } from 'react-router';
import TestProjects from '@/app/pages/projects/TestProjects';
import TestCases from '@/app/pages/cases/TestCases';
import TestRuns from '@/app/pages/runs/TestRuns';
import AdminHome from '@/app/pages/admin/AdminHome';
import Reports from '@/app/pages/reports/Reports';
import Home from '@/app/pages/dashboard/Home';
import LoginPage from '@/app/pages/auth/login/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import RoleProtectedRoutes from './RoleProtectedRoutes';
import TestProjectDetails from '@/app/pages/projects/TestProjectDetails';
import Logout from '@/app/pages/auth/logout/Logout';
import TestProjectCreate from '@/app/pages/projects/TestProjectCreate';
import AuthInitializer from '@/AuthInitializer.tsx';

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
    path: '/forgot-password',
    element: <LoginPage />
  },
  {
    path: '/reset-password',
    element: <LoginPage />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    element: (
      <AuthInitializer>
        <ProtectedRoutes />
      </AuthInitializer>
    ),
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
        path: '/projects/create',
        element: <TestProjectCreate />
      },
      {
        path: '/projects/:id',
        loader: async ({ params }) => {
          return params.id;
        },
        element: <TestProjectDetails />
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
        path: '/runs/new',
        element: <TestRuns />
      },
      {
        path: '/reports',
        element: <Reports />
      },
      {
        element: <RoleProtectedRoutes allowedRoles={['admin']} />,
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
