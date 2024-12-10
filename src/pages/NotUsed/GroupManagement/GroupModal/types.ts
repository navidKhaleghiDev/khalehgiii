import { DaAsParams, GroupParams } from '@src/services/users/types';
import { Control } from 'react-hook-form';

export type UsersListNUProps = {
  users: any;
  control: Control<any>;
  isAddNew: boolean;
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  listDaas: DaAsParams[];
  loading: boolean;
  updateGroup: (updatedList: GroupParams) => void;
};
export type GroupsType = DaAsParams[] | GroupParams;

export type GroupModalProps = {
  handleClose: (isUpdated?: boolean) => void;
  group?: GroupParams;
  mutate: any;
  loadingGroup?: boolean;
  setGroupSelected: any;
};
export type GroupTabsRefType = {
  changeTab: (index: number) => void;
  getActiveTab?: () => number;
};
export type GroupUpdateNU = {
  id?: string;
  users: {
    id: string;
    email: string;
    is_running?: boolean;
    has_online_assistance?: boolean;
  }[];
  admins: {
    id: string;
    email: string;
    is_running?: boolean;
    has_online_assistance?: boolean;
  }[];
  name: string;
  image?: string | Blob | undefined;
};
