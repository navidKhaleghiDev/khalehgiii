export type RoutePathType =
  | "unauthorized"
  | "login"
  | "dashboard"
  | "home"
  | "dashboardDesktopList";

export const RoutesName = {
  HOME: "home",
  DASHBOARD: "dashboard",
  UNAUTHORIZED: "unauthorized",
  DESKTOP_LIST: "desktop-list",
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: "/",
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
  dashboardDesktopList: `/${RoutesName.DASHBOARD}/${RoutesName.DESKTOP_LIST}`,
};
