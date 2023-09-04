import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateLayout from "@ui/Templates/layouts/PrivateLayout";
import { LoginPage } from "@src/pages/Login";
import NotFoundPage from "@src/pages/NotFound";
import { DashboardPage } from "@src/pages/Dashboard";

interface IRoute {
  element: ReactElement;
  path: string;
}
export function RenderRoutes() {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        {[{ element: <DashboardPage />, path: "/dashboard" }].map(
          (route: IRoute) => (
            <Route key={route.path} path={route.path} element={route.element} />
          )
        )}
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
