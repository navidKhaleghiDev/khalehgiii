/* eslint-disable react/jsx-props-no-spreading */
import { ComponentType, useMemo, ReactNode } from 'react';
import { useUserContext } from '@context/user/userContext';
import { IUserPermissions, PermissionsCodeName } from '@src/types/permissions';
import { checkPermission } from '../hooks/usePermission';

export const withPermission = (
  WrappedComponent: ComponentType<any>,
  requiredPermissions: PermissionsCodeName | PermissionsCodeName[]
) => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function ComponentWithPermission<P extends object>(
    props: P
  ): ReactNode | null {
    const { user } = useUserContext();

    const userPermissions = useMemo(() => user?.user_permissions || [], [user]);

    const allUserPermissions = useMemo(
      () => userPermissions.map((perm: IUserPermissions) => perm.codename),
      [userPermissions]
    );

    const hasPermission = useMemo(() => {
      return checkPermission(allUserPermissions, requiredPermissions);
    }, [allUserPermissions]);

    if (!hasPermission) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  ComponentWithPermission.displayName = `WithPermission(${displayName})`;

  return ComponentWithPermission;
};
