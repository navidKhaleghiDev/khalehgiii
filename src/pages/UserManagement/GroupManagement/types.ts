import { Dispatch, SetStateAction } from 'react';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

export type TGroupMembers = {
  value?: keyof TGroup;
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
export type TGroupCreate = {
  name: string;
  image: string | Blob | undefined;
};
export type GroupManagementAddNewMemberProps = {
  handleCloseModal: () => void;
  onClick: (data: any) => void;
};
export type GroupManagementCreateProps = {
  handleCloseModal: () => void;
};

export type GroupManagementUsersListProps = {
  memberData: any;
  countPage: any;
  currentPage: any;
  pageSize: number;
  isLoading: boolean;
  setCurrentPage: any;
  keyRef: any;
  selectedData: any;
  setSelectedData: any;
  filterQuery: string;
};
export type GroupManagementEditFormProps = {
  setFilterQuery: (e: string) => void;
  filterQuery: string;
  // paginatedData: (key: keyof TGroup) => TGroupMembers[];
  pageSize: number;
  setCurrentPage: (val: number) => void;
  handleClickAction: any;
  isLoading: boolean;
  currentPage: number;
  group: TGroup;
  control: Control<TGroupUpdate>;
  handleSubmit: UseFormHandleSubmit<TGroupUpdate, undefined>;
  onSubmit: SubmitHandler<TGroupUpdate>;
  allGroupData: TGroup;
  isDirty: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
};