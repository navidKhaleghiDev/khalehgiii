import PrivateLayout from '@src/components/Templates/layouts/PrivateLayout';
import { LoginPage } from '@src/pages/Login';
import { DashboardPage } from '@src/pages/Dashboard';
import NotFoundPage from '@src/pages/NotFound';
import UnauthorizedPage from '@src/pages/Unauthorized';
import { DashboardDesktopListPage } from '@src/pages/DashboardDesktopList';
import { DashboardMonitoring } from '@src/pages/DashboardMonitoring';
import { ScannedFileListPage } from '@src/pages/ScannedFileListPage';
import { Reports } from '@src/pages/Dashboard/Reports';

import { UbaPage } from '@src/pages/Uba';
import { DashboardAdminsListPage } from '@src/pages/DashboardAdminsList';
import { DashboardExtensionListPage } from '@src/pages/DashboardExtensionList';
import { InternetLog } from '@src/pages/Dashboard/InternetLog';
import {
  EPermissionDaas,
  EPermissionExtensions,
  EPermissionFileScan,
  EPermissionInternetLogs,
  EPermissionScanReports,
  EPermissionSessionRecording,
  EPermissionUba,
  EPermissionUsers,
} from '@src/types/permissions';

import { LoginOnlineAssistance } from '@src/pages/LoginOnlineAssistance';
import { SessionRecording } from '@src/pages/SessionRecording/indexs';
import { OnlineAssistance } from '@src/pages/Dashboard/OnlineAssistance';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ROUTES_PATH } from './routesConstants';
import { ProtectedRoute } from './ProtectedRoute';
import { AssistanceDashboard } from '../pages/AssistanceDashboard/index';

type AppRouter = ReturnType<typeof createBrowserRouter>;

function routesConfig(user: any): AppRouter {
  console.log({ user });

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

  const privateRoutes: RouteObject[] = [
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
        {
          path: ROUTES_PATH.reports,
          element: (
            <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
              <Reports />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.internetLog,
          element: (
            <ProtectedRoute requiredPermission={EPermissionInternetLogs.VIEW}>
              <InternetLog />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.dashboardDesktopList,
          element: (
            <ProtectedRoute requiredPermission={EPermissionDaas.VIEW}>
              <DashboardDesktopListPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.dashboardSessionRecordingList,
          element: (
            <ProtectedRoute
              requiredPermission={EPermissionSessionRecording.VIEW}
            >
              <SessionRecording />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.dashboardAdminsList,
          element: (
            <ProtectedRoute requiredPermission={EPermissionUsers.VIEW}>
              <DashboardAdminsListPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.monitoringDetails,
          element: (
            <ProtectedRoute requiredPermission={EPermissionFileScan.VIEW}>
              <ScannedFileListPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.monitoring,
          element: (
            <ProtectedRoute requiredPermission={EPermissionFileScan.VIEW}>
              <DashboardMonitoring />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.extensionList,
          element: (
            <ProtectedRoute requiredPermission={EPermissionExtensions.VIEW}>
              <DashboardExtensionListPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES_PATH.uba,
          element: (
            <ProtectedRoute requiredPermission={EPermissionUba.VIEW}>
              <UbaPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ];

  return createBrowserRouter(user ? privateRoutes : publicRoutes);
}

export default routesConfig;
