export type RoutePathType =
  | "unauthorized"
  | "login"
  | "dashboard"
  | "home"
  | "monitoring"
  | "adminKeycloakPage"
  | "monitoringDetails"
  | "dashboardDesktopList";

export const RoutesName = {
  HOME: "home",
  DASHBOARD: "dashboard",
  UNAUTHORIZED: "unauthorized",
  DESKTOP_LIST: "desktop-list",
  MONITORING: "monitoring",
  ADMIN_KEYKLOAK: "keycloak-panel",
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: "/",
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
  monitoringDetails: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}/:id`,
  monitoring: `/${RoutesName.DASHBOARD}/${RoutesName.MONITORING}`,
  adminKeycloakPage: `/${RoutesName.DASHBOARD}/${RoutesName.ADMIN_KEYKLOAK}`,
};
