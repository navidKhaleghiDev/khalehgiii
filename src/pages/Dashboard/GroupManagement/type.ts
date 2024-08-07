import { TGroup } from '@src/services/users/types';

export type TGroupModal = {
  open: boolean;
  groupList?: TGroup;
};

export type TUserList = { id: string; email: string }[];

export type TGroupListUpdate = {
  users: { id: string; email: string }[];
  admins: { id: string; email: string }[];
  name: string;
};
