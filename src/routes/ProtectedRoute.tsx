import { PropsWithChildren } from 'react';
import UnauthorizedPage from '@src/pages/Unauthorized';
import { useHasPermission } from '@src/helper/hooks/usePermission';
import { PermissionsCodeName } from '@src/types/permissions';

interface ProtectedRouteProps extends PropsWithChildren {
  requiredPermission: PermissionsCodeName | PermissionsCodeName[];
}

export function ProtectedRoute({
  children,
  requiredPermission,
}: ProtectedRouteProps) {
  const hasPermission = useHasPermission(requiredPermission);

  if (!hasPermission) {
    return <UnauthorizedPage />;
  }

  return children;
}
