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
  | 'sarg';

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
  SARG: 'sarg',
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: '/',
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  uba: `/${RoutesName.DASHBOARD}/${RoutesName.UBA}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
  dashboardAdminsList: `/${RoutesName.DASHBOARD}/${RoutesName.ADMINS_LIST}`,
  monitoringDetails: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}/:id`,
  monitoring: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}`,
  reports: `/${RoutesName.DASHBOARD}/${RoutesName.REPORTS}`,
  sarg: `/${RoutesName.DASHBOARD}/${RoutesName.SARG}`,
  extensionList: `/${RoutesName.DASHBOARD}/${RoutesName.EXTENSION_LIST}`,
  adminKeycloakPage: `/${RoutesName.DASHBOARD}/${RoutesName.ADMIN_KEYKLOAK}`,
};
