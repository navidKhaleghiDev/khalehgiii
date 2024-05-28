import { useMemo } from 'react';
import { useUserContext } from '@context/user/userContext';
import { IUserPermissions, PermissionsCodeName } from '@src/types/permissions';

// type UsePermissionResult = {
//   hasPermission?: boolean;
//   allUserPermissions?: PermissionsCodeName[];
// };

export function checkPermission(
  permissions?: PermissionsCodeName[],
  requiredPermissions?: PermissionsCodeName | PermissionsCodeName[]
): boolean {
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

export const useUserPermission = (): PermissionsCodeName[] => {
  const { user } = useUserContext();

  const userPermissions = useMemo(
    () => (user && user?.user_permissions) || [],
    [user]
  );
  return userPermissions.map((userP: IUserPermissions) => userP.codename);
};

export const useHasPermission = (
  requiredPermissions: PermissionsCodeName | PermissionsCodeName[]
): boolean => {
  const userPermissions = useUserPermission();

  const hasPermission = useMemo(() => {
    return checkPermission(userPermissions, requiredPermissions);
  }, [requiredPermissions, userPermissions]);

  return hasPermission;
};
