export type RoutePathType =
  | "unauthorized"
  | "login"
  | "dashboard"
  | "home"
  | "monitoring"
  | "adminKeycloakPage"
  | "monitoringDetails"
  | "dashboardAdminsList"
  | "uba"
  | "dashboardDesktopList";

export const RoutesName = {
  HOME: "home",
  DASHBOARD: "dashboard",
  UNAUTHORIZED: "unauthorized",
  DESKTOP_LIST: "desktop-list",
  ADMINS_LIST: "admins-list",
  MONITORING: "monitoring",
  ADMIN_KEYKLOAK: "keycloak-panel",
  UBA: "uba",
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: "/",
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  uba: `/${RoutesName.DASHBOARD}/${RoutesName.UBA}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
  dashboardAdminsList: `/${RoutesName.DASHBOARD}/${RoutesName.ADMINS_LIST}`,
  monitoringDetails: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}/:id`,
  monitoring: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}`,
  adminKeycloakPage: `/${RoutesName.DASHBOARD}/${RoutesName.ADMIN_KEYKLOAK}`,
};
