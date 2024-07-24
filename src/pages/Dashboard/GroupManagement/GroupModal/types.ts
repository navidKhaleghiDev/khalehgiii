import { IDaAs, TGroup } from '@src/services/users/types';
import { Control, useFormContext } from 'react-hook-form';

export type TUsersListProps = {
  users: any;
  control: Control<any>;
  isAddNew: boolean;
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  listDaas: IDaAs[];
  loading: boolean;
  updateGroup: (updatedList: TGroup) => void;
};
export type GroupsType = IDaAs[] | TGroup;

export type GroupModalProps = {
  handleClose: (isUpdated?: boolean) => void;
  // group?: {
  //   id: string;
  //   users: { id: string; email: string }[];
  //   admins: { id: string; email: string }[];
  //   name: string;
  //   created_at: string;
  //   updated_at: string;
  //   image: string | undefined;
  // };
  group?: TGroup;
  mutate: any;
  loadingGroup?: boolean;
};
export type GroupTabsRefType = {
  changeTab: (index: number) => void;
  getActiveTab?: () => number;
};
