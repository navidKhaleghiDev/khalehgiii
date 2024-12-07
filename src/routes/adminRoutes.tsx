import { NotFoundPage } from '@src/pages/NotFound';
import PrivateLayout from '@ui/Templates/layouts/PrivateLayout';
import { LoginOnlineAssistance } from '@src/pages/LoginOnlineAssistance';
import { AssistanceDashboard } from '@src/pages/LoginOnlineAssistance/AssistanceDashboard';
import { Reports } from '@src/pages/Reports';
import {
  PermissionDaas,
  PermissionExtensions,
  PermissionFileScan,
  PermissionInternetLogs,
  PermissionScanReports,
  PermissionUba,
  PermissionUsers,
} from '@src/types/permissions';
import { UbaPage } from '@src/pages/FIleReports/UbaPage';
import { DashboardPage } from '@src/pages/Dashboard';
import { GroupManagementEdit } from '@src/pages/UserManagement/GroupManagement/GroupManagementEdit';
import { KnowledgeManagementPage } from '@src/pages/FIleReports/KnowledgeManagementPage';
import { DashboardDesktopListPage } from '@src/pages/UserManagement/UserListPage';
import { DashboardAdminsListPage } from '@src/pages/UserManagement/AdminListPage';
import { InternetLog } from '@src/pages/SystemStrategy/InternetLogPage';
import { ReportFileScanPage } from '@src/pages/FIleReports/FileScanPage';
import { GroupManagement } from '@src/pages/UserManagement/GroupManagement';
import { MonitoringPage } from '@src/pages/SystemStrategy/MonitoringPage';
import { DashboardExtensionListPage } from '@src/pages/SystemStrategy/ExtensionListPage';
import { License } from '@src/pages/SystemStrategy/LicensePage';
import Application from '@src/pages/Setting/Application';
import UnauthorizedPage from '@src/pages/Unauthorized';
import { DaasSetting } from '@src/pages/Setting/DaasSetting';
import { DlpSetting } from '@src/pages/Setting/DlpSetting';

import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES_PATH } from './routesConstants';

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
        element: <KnowledgeManagementPage />,
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
          <ProtectedRoute requiredPermission={PermissionInternetLogs.VIEW}>
            <InternetLog />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dashboardDesktopList,
        element: (
          <ProtectedRoute requiredPermission={PermissionDaas.VIEW}>
            <DashboardDesktopListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dashboardAdminsList,
        element: (
          <ProtectedRoute requiredPermission={PermissionUsers.VIEW}>
            <DashboardAdminsListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.reportsScanFile,
        element: (
          <ProtectedRoute requiredPermission={PermissionFileScan.VIEW}>
            <ReportFileScanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.monitoring,
        element: (
          <ProtectedRoute requiredPermission={PermissionFileScan.VIEW}>
            <MonitoringPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.extensionList,
        element: (
          <ProtectedRoute requiredPermission={PermissionExtensions.VIEW}>
            <DashboardExtensionListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.uba,
        element: (
          <ProtectedRoute requiredPermission={PermissionUba.VIEW}>
            <UbaPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.licence,
        element: (
          <ProtectedRoute requiredPermission={PermissionUba.VIEW}>
            <License />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.chart,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dashboardGroupManagement,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <GroupManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dashboardGroupManagementEdit,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <GroupManagementEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.setting,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <div>Setting Page</div>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.application,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <Application />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.daas,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <DaasSetting />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES_PATH.dlp,
        element: (
          <ProtectedRoute requiredPermission={PermissionScanReports.VIEW}>
            <DlpSetting />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
