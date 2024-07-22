export type TGroupModal = {
  open: boolean;
  groupList?: TGroupList;
};

export type TGroupList = {
  id: string;
  users: { id: string; email: string }[];
  admins: { id: string; email: string }[];
  name: string;
  created_at: string;
  updated_at: string;
  image: string | undefined;
};
