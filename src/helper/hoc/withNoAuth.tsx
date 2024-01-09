import { Navigate } from 'react-router-dom';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import cookie from 'js-cookie';
import { STORAGE_KEY_TOKEN } from '@src/services/http';

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
