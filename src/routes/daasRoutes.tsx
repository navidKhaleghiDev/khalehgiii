import UnauthorizedPage from '@src/pages/Unauthorized';
import NotFoundPage from '@src/pages/NotFound';
import PrivateLayout from '@ui/Templates/layouts/PrivateLayout';
import { LoginOnlineAssistance } from '@src/pages/LoginOnlineAssistance';
import { AssistanceDashboard } from '@src/pages/AssistanceDashboard';
import { DaasDashboard } from '@src/pages/Dashboard/DaasDashboard';
import { ROUTES_PATH } from './routesConstants';

export const daasRoutes = [
  {
    path: ROUTES_PATH.unauthorized,
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: ROUTES_PATH.loginAssistance,
    element: <LoginOnlineAssistance />,
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTES_PATH.home,
        element: <DaasDashboard />,
      },
      {
        path: ROUTES_PATH.loginAssistance,
        element: <LoginOnlineAssistance />,
      },
      {
        path: ROUTES_PATH.assistanceDashboard,
        element: <AssistanceDashboard />,
      },
    ],
  },
];
