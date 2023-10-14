export type RoutePathType =
  | "unauthorized"
  | "login"
  | "dashboard"
  | "home"
  | "adminKeycloakPage"
  | "dashboardDesktopList";

export const RoutesName = {
  HOME: "home",
  DASHBOARD: "dashboard",
  UNAUTHORIZED: "unauthorized",
  DESKTOP_LIST: "desktop-list",
  ADMIN_KEYKLOAK: "keycloak-panel",
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: "/",
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
  adminKeycloakPage: `/${RoutesName.DASHBOARD}/${RoutesName.ADMIN_KEYKLOAK}`,
};
