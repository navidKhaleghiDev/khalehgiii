export type RoutePathType =
  | 'unauthorized'
  | 'login'
  | 'dashboard'
  | 'home'
  | 'monitoring'
  | 'adminKeycloakPage'
  | 'reportsScanFileDetails'
  | 'dashboardAdminsList'
  | 'uba'
  | 'extensionList'
  | 'reports'
  | 'reportsScanFile'
  | 'dashboardDesktopList'
  | 'dashboardSessionRecordingList'
  | 'dashboardSessionRecording'
  | 'knowledgeManagement'
  | 'internetLog'
  | 'loginAssistance'
  | 'assistanceDashboard';

export const RoutesName = {
  HOME: 'home',
  DASHBOARD: 'dashboard',
  UNAUTHORIZED: 'unauthorized',
  DESKTOP_LIST: 'desktop-list',
  ADMINS_LIST: 'admins-list',
  MONITORING: 'monitoring',
  REPORT_SCAN_FILE: 'report-scan-file',
  ADMIN_KEYKLOAK: 'keycloak-panel',
  EXTENSION_LIST: 'extension-list',
  UBA: 'uba',
  REPORTS: 'reports',
  SESSIONRECORDING: 'session-recording',
  INTERNETLOG: 'internet-log',
  KNOWLEDGE_MANAGEMENT: 'knowledge-management',
  LOGIN_ASSISTANCE: 'login-assistanse',
  ASSISTANCE_DASHBOARD: 'assistanse-dashboard',
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: '/',
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  uba: `/${RoutesName.DASHBOARD}/${RoutesName.UBA}`,
  knowledgeManagement: `/${RoutesName.DASHBOARD}/${RoutesName.KNOWLEDGE_MANAGEMENT}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
  dashboardSessionRecording: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}/${RoutesName.SESSIONRECORDING}`,
  dashboardSessionRecordingList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}/${RoutesName.SESSIONRECORDING}/:id`,
  dashboardAdminsList: `/${RoutesName.DASHBOARD}/${RoutesName.ADMINS_LIST}`,
  monitoring: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}`,
  reportsScanFileDetails: `/${RoutesName.DASHBOARD}/${RoutesName.REPORT_SCAN_FILE}/:id`,
  reportsScanFile: `/${RoutesName.DASHBOARD}/${RoutesName.REPORT_SCAN_FILE}`,
  reports: `/${RoutesName.DASHBOARD}/${RoutesName.REPORTS}`,
  internetLog: `/${RoutesName.DASHBOARD}/${RoutesName.INTERNETLOG}`,
  extensionList: `/${RoutesName.DASHBOARD}/${RoutesName.EXTENSION_LIST}`,
  adminKeycloakPage: `/${RoutesName.DASHBOARD}/${RoutesName.ADMIN_KEYKLOAK}`,
  loginAssistance: `/${RoutesName.LOGIN_ASSISTANCE}`,
  assistanceDashboard: `/${RoutesName.ASSISTANCE_DASHBOARD}`,
};
