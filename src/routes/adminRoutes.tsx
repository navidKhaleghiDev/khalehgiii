import UnauthorizedPage from '@src/pages/Unauthorized';
import NotFoundPage from '@src/pages/NotFound';
import PrivateLayout from '@ui/Templates/layouts/PrivateLayout';
import { KnowledgeManagement } from '@src/pages/Dashboard/KnowledgeManagement';
import { LoginOnlineAssistance } from '@src/pages/LoginOnlineAssistance';
import { AssistanceDashboard } from '@src/pages/AssistanceDashboard';
import { Reports } from '@src/pages/Dashboard/Reports';
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
import { InternetLog } from '@src/pages/Dashboard/InternetLog';
import { DashboardDesktopListPage } from '@src/pages/DashboardDesktopList';
import { SessionRecording } from '@src/pages/SessionRecording/index';
import { DashboardAdminsListPage } from '@src/pages/DashboardAdminsList';
import { ScannedFileListPage } from '@src/pages/ScannedFileListPage';
import { DashboardMonitoring } from '@src/pages/DashboardMonitoring';
import { DashboardExtensionListPage } from '@src/pages/DashboardExtensionList';
import { UbaPage } from '@src/pages/Uba';
import { DashboardPage } from '@src/pages/Dashboard';
import { ROUTES_PATH } from './routesConstants';
import { ProtectedRoute } from './ProtectedRoute';

export const adminRoutes = [
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
        path: ROUTES_PATH.knowledgeManagement,
        element: <KnowledgeManagement />,
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
          <ProtectedRoute requiredPermission={EPermissionSessionRecording.VIEW}>
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
