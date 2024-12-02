import { UserPermissionsProps } from '@src/types/permissions';

export interface PermissionOptionsProps {
  loading: boolean;
  permissions: UserPermissionsProps[];
  selectedPermissions: UserPermissionsProps[];
  setSelectedPermissions: (permissions: UserPermissionsProps[]) => void;
}
