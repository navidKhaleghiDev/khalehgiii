import { GroupParams } from '@src/services/users/types';

export type GroupModalParams = {
  open: boolean;
  groupList?: GroupParams;
};

export type UsersListParams = { id: string; email: string }[];

export type GroupListUpdateParams = {
  users: UsersListParams;
  admins: UsersListParams;
  name: string;
};
