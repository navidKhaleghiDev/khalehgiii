export type TGroupModal = {
  open: boolean;
  groupList?: TGroupList;
};

export type TUser = [{ id: string; email: string }];
export type TGroupList = {
  id: string;
  users: { id: string; email: string }[];
  admins: { id: string; email: string }[];
  name: string;
  created_at: string;
  updated_at: string;
  image: string | undefined;
};
export type TGroupListUpdate = {
  users: { id: string }[];
  admins: { id: string }[];
  name: string;
};
