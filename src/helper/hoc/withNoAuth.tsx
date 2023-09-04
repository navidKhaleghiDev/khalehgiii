/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from 'react-router-dom';
import cookie from 'js-cookie';
import { STORAGE_KEY_TOKEN } from '@src/services/http';
import { ROUTES_PATH } from '@src/routes/routesConstants';

export function withNoAuth<T extends Partial<T>>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function ComponentWithoutAuth(props: T) {
    const token = cookie.get(STORAGE_KEY_TOKEN);

    return !token ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate replace to={ROUTES_PATH.dashboard} />
    );
  }

  ComponentWithoutAuth.displayName = `withNoAuth(${displayName})`;

  return ComponentWithoutAuth;
}
