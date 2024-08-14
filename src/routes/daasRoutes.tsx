import UnauthorizedPage from '@src/pages/Unauthorized';
import NotFoundPage from '@src/pages/NotFound';
import PrivateLayout from '@ui/Templates/layouts/PrivateLayout';
import { DashboardPage } from '@src/pages/Dashboard';
import { OnlineAssistance } from '@src/pages/Dashboard/OnlineAssistance';
import { LoginOnlineAssistance } from '@src/pages/LoginOnlineAssistance';
import { AssistanceDashboard } from '@src/pages/AssistanceDashboard';
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
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTES_PATH.dashboard,
        element: <DashboardPage />,
      },
      {
        path: ROUTES_PATH.onlineAssistance,
        element: <OnlineAssistance />,
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
