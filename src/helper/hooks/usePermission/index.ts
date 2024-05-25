import { useMemo } from 'react';
import { useUserContext } from '@context/user/userContext';
import { IUserPermissions, PermissionsCodeName } from '@src/types/permissions';

type UsePermissionResult = {
  hasPermission?: boolean;
  allUserPermissions?: PermissionsCodeName[];
};

export function checkPermission(
  permissions?: PermissionsCodeName[],
  requiredPermissions?: PermissionsCodeName | PermissionsCodeName[]
): boolean {
  console.count('checkPermission');

  if (!permissions || !requiredPermissions) {
    return false;
  }

  const check = (permission: PermissionsCodeName) =>
    permissions.includes(permission);

  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.every(check);
  }
  return check(requiredPermissions);
}

export const usePermission = (
  requiredPermissions?: PermissionsCodeName | PermissionsCodeName[]
): UsePermissionResult => {
  const { user } = useUserContext();

  const userPermissions = useMemo(
    () => (user && user?.user_permissions) || [],
    [user]
  );

  const allUserPermissions = useMemo(
    () => userPermissions.map((userP: IUserPermissions) => userP.codename),
    [userPermissions]
  );

  const hasPermission = useMemo(() => {
    return checkPermission(allUserPermissions, requiredPermissions);
  }, [requiredPermissions, allUserPermissions]);

  return {
    hasPermission,
    allUserPermissions,
  };
};
