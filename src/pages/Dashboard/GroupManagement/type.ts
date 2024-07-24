import { TGroup } from '@src/services/users/types';

export type TGroupModal = {
  open: boolean;
  groupList?: TGroup;
};

export type TUser = [{ id: string; email: string }];

export type TGroupListUpdate = {
  users: { id: string }[];
  admins: { id: string }[];
  name: string;
};
