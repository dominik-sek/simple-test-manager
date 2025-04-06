import { createBrowserRouter } from 'react-router';
import TestProjects from '@/app/pages/projects/TestProjects';
import TestCases from '@/app/pages/cases/TestCases';
import TestRuns from '@/app/pages/runs/TestRuns';
import AdminHome from '@/app/pages/admin/AdminHome';
import Reports from '@/app/pages/reports/Reports';
import Home from '@/app/pages/dashboard/Home';

export const router = createBrowserRouter([
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
    path: '/admin',
    element: <AdminHome />
  }

])
