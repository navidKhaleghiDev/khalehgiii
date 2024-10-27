import { IUserPermissions } from '@src/types/permissions';

export interface IPermissionOptionsProps {
  loading: boolean;
  permissions: IUserPermissions[];
  // setSelectedSwitches: any;
  selectedPermissions: IUserPermissions[];
  setSelectedPermissions: (permissions: IUserPermissions[]) => void;
}
