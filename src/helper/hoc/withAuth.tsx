/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { STORAGE_KEY_USER } from "@src/services/users";

export function withAuth<T extends Partial<T>>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function ComponentWithAuth(props: T) {
    const user = localStorage.getItem(STORAGE_KEY_USER);

    return !user ? (
      <Navigate replace to={ROUTES_PATH.login} />
    ) : (
      <WrappedComponent {...props} />
    );
  }

  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
}
