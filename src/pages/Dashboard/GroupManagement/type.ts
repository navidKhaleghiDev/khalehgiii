import { TGroup } from '@src/services/users/types';

export type TGroupModal = {
  open: boolean;
  groupList?: TGroup;
};

export type TUserList = { id: string; email: string }[];

export type TGroupListUpdate = {
  users: TUserList;
  admins: TUserList;
  name: string;
};
