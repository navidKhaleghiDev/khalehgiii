export type TGroupMembers = {
  value?: 'users' | 'admins';
  id: string;
  email: string;
  is_running?: boolean;
  has_online_assistance?: boolean;
};

export type TGroup = {
  id?: string;
  users: TGroupMembers[];
  admins: TGroupMembers[];
  name: string;
  created_at?: string;
  updated_at?: string;
  image: string | Blob | undefined;
};

export type UpdateGroupPayload = {
  users: string[] | TGroup['users'];
  admins: string[] | TGroup['admins'];
  name: string;
};

export type DefaultValueForm = Omit<
  TGroup,
  'users' | 'admins' | 'created_at' | 'updated_at' | 'id'
>;

export type TGroupUpdate = {
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
