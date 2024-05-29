import { IUserPermissions } from '@src/types/permissions';

export interface IPermissionOptionsProps {
  permissions: IUserPermissions[];
  setSelectedSwitches: any;
  selectedSwitches: [] | number[];
}
