export type RoutePathType =
  | 'unauthorized'
  | 'login'
  | 'dashboard'
  | 'home'
  | 'monitoring'
  | 'adminKeycloakPage'
  | 'monitoringDetails'
  | 'dashboardAdminsList'
  | 'uba'
  | 'extensionList'
  | 'reports'
  | 'dashboardDesktopList'
  | 'dashboardSessionRecordingList'
  | 'dashboardSessionRecording'
  | 'internetLog'
  | 'loginAssistanse'
  | 'assistanseDashboard';

export const RoutesName = {
  HOME: 'home',
  DASHBOARD: 'dashboard',
  UNAUTHORIZED: 'unauthorized',
  DESKTOP_LIST: 'desktop-list',
  ADMINS_LIST: 'admins-list',
  MONITORING: 'monitoring',
  ADMIN_KEYKLOAK: 'keycloak-panel',
  EXTENSION_LIST: 'extension-list',
  UBA: 'uba',
  REPORTS: 'reports',
  SESSIONRECORDING: 'session-recording',
  INTERNETLOG: 'internet-log',
  LOGIN_ASSISTANSE: 'login-assistanse',
  ASSISTANSE_DASHBOARD: 'assistanse-dashboard',
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: '/',
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  uba: `/${RoutesName.DASHBOARD}/${RoutesName.UBA}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
  dashboardSessionRecording: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}/${RoutesName.SESSIONRECORDING}`,
  dashboardSessionRecordingList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}/${RoutesName.SESSIONRECORDING}/:id`,
  dashboardAdminsList: `/${RoutesName.DASHBOARD}/${RoutesName.ADMINS_LIST}`,
  monitoringDetails: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}/:id`,
  monitoring: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}`,
  reports: `/${RoutesName.DASHBOARD}/${RoutesName.REPORTS}`,
  internetLog: `/${RoutesName.DASHBOARD}/${RoutesName.INTERNETLOG}`,
  extensionList: `/${RoutesName.DASHBOARD}/${RoutesName.EXTENSION_LIST}`,
  adminKeycloakPage: `/${RoutesName.DASHBOARD}/${RoutesName.ADMIN_KEYKLOAK}`,
  loginAssistanse: `/${RoutesName.LOGIN_ASSISTANSE}`,
  assistanseDashboard: `/${RoutesName.ASSISTANSE_DASHBOARD}`,
};
