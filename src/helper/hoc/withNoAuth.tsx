/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { STORAGE_KEY_USER } from "@src/services/users";

export function withNoAuth<T extends Partial<T>>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function ComponentWithoutAuth(props: T) {
    const user = localStorage.getItem(STORAGE_KEY_USER);

    return !user ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate replace to={ROUTES_PATH.dashboard} />
    );
  }

  ComponentWithoutAuth.displayName = `withNoAuth(${displayName})`;

  return ComponentWithoutAuth;
}
