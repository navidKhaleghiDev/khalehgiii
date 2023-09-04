import { RoutePathType } from "./types";

export const RoutesName = {
  HOME: "home",
  DASHBOARD: "dashboard",
  UNAUTHORIZED: "unauthorized",
};

export const ROUTES_PATH: Record<RoutePathType, string> = {
  home: "/",
  unauthorized: `/${RoutesName.UNAUTHORIZED}`,
  login: `/`,
  dashboard: `/${RoutesName.DASHBOARD}`,
};
