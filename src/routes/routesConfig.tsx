import { LoginPage } from '@src/pages/Login';
import NotFoundPage from '@src/pages/NotFound';
import UnauthorizedPage from '@src/pages/Unauthorized';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ROUTES_PATH } from './routesConstants';

import { adminRoutes } from './adminRoutes';
import { daasRoutes } from './daasRoutes';

const publicRoutes: RouteObject[] = [
  {
    path: ROUTES_PATH.unauthorized,
    element: <UnauthorizedPage />,
  },
  {
    path: ROUTES_PATH.home,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

type AppRouter = ReturnType<typeof createBrowserRouter>;

function routesConfig(user: any): AppRouter {
  const privateRoutes: RouteObject[] =
    user?.is_meta_admin || user?.is_superuser ? adminRoutes : daasRoutes;

  return createBrowserRouter(user ? privateRoutes : publicRoutes);
}

export default routesConfig;
