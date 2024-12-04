import { ResponseData } from '@src/types/services';
import { Dispatch, SetStateAction } from 'react';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { MutatorCallback } from 'swr';

export type GroupMembersParams = {
  value: 'users' | 'admins';
  id: string;
  email: string;
  is_running: boolean;
  has_online_assistance: boolean;
};

export type GroupParams = {
  id?: string;
  users: GroupMembersParams[];
  admins: GroupMembersParams[];
  name: string;
  created_at: string;
  updated_at: string;
  image: string | Blob | undefined;
  online_users: number;
};

export type UpdateGroupPayload = {
  users: string[] | GroupParams['users'];
  admins: string[] | GroupParams['admins'];
  name: string;
};

export type DefaultValueForm = Omit<
  GroupParams,
  'users' | 'admins' | 'created_at' | 'updated_at' | 'id'
>;

export type GroupCreateParams = {
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

export type GroupManagementEditRenderComponentsProps = {
  updateGroup: GroupParams;
  setUpdateGroup: Dispatch<SetStateAction<GroupParams>>;
  mutate: (
    data?:
      | ResponseData<GroupParams>
      | Promise<ResponseData<GroupParams>>
      | MutatorCallback<ResponseData<GroupParams>>,
    options?: { revalidate?: boolean }
  ) => Promise<ResponseData<GroupParams> | undefined>;
  group: GroupParams;
};
export type GroupOnClickParams = {
  action: ActionType;
  row: GroupMembersParams;
};
export type GroupManagementEditFormProps<T> = {
  setFilterQuery: (e: string) => void;
  filterQuery: string;
  setCurrentPage: (val: number) => void;
  handleClickAction: (
    action: GroupOnClickParams['action'],
    row: GroupOnClickParams['row']
  ) => void;
  pageSize: number;
  isLoading: boolean;
  currentPage: number;
  control: Control<GroupParams>;
  handleSubmit: UseFormHandleSubmit<GroupParams>;
  onSubmit: SubmitHandler<GroupParams>;
  allGroupData: T;
  isDirty: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  updateGroup: T;
};

export type ActionType = 'users' | 'admins' | 'delete';
