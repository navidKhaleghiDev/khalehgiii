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
import { DashboardExtensionListPage } from '@src/pages/ExtensionListPage';
import { MonitoringPage } from '@src/pages/Monitoring';
import { UbaPage } from '@src/pages/Uba';
import { ReportFileScanPage } from '@src/pages/ReportFileScan';
import { DashboardPage } from '@src/pages/Dashboard';
import Application from '@src/pages/Setting/Application';
import { DaasSetting } from '@src/pages/Setting/DaasSetting';
import { License } from '@src/pages/Lisence';

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
        path: ROUTES_PATH.home,
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
        path: ROUTES_PATH.reportsScanFileDetails,
        element: (
          <ProtectedRoute requiredPermission={EPermissionFileScan.VIEW}>
            <ScannedFileListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.reportsScanFile,
        element: (
          <ProtectedRoute requiredPermission={EPermissionFileScan.VIEW}>
            <ReportFileScanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.monitoring,
        element: (
          <ProtectedRoute requiredPermission={EPermissionFileScan.VIEW}>
            <MonitoringPage />
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
      {
        path: ROUTES_PATH.licence,
        element: (
          <ProtectedRoute requiredPermission={EPermissionUba.VIEW}>
            <License />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.chart,
        element: (
          <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dashboardGroupManagement,
        element: (
          <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
            <div>GroupManagement Page</div>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.setting,
        element: (
          <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
            <div>Setting Page</div>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.application,
        element: (
          <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
            <Application />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.daas,
        element: (
          <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
            <DaasSetting />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dlp,
        element: (
          <ProtectedRoute requiredPermission={EPermissionScanReports.VIEW}>
            <div>DLP Page</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
