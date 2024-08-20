import { IUserPermissions } from '@src/types/permissions';

export interface IPermissionOptionsProps {
  loading: boolean;
  permissions: IUserPermissions[];
  setSelectedSwitches: any;
  selectedSwitches: IUserPermissions[];
}
