import { IResponseData } from '@src/types/services';
import { Dispatch, SetStateAction } from 'react';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { MutatorCallback } from 'swr';

export type TGroupMembers = {
  value: 'users' | 'admins';
  id: string;
  email: string;
  is_running: boolean;
  has_online_assistance: boolean;
};

export type TGroup = {
  id?: string;
  users: TGroupMembers[];
  admins: TGroupMembers[];
  name: string;
  created_at: string;
  updated_at: string;
  image: string | Blob | undefined;
  online_users: number;
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

export type GroupManagementEditRenderComponentsProps = {
  updateGroup: TGroup;
  setUpdateGroup: Dispatch<SetStateAction<TGroup>>;
  mutate: (
    data?:
      | IResponseData<TGroup>
      | Promise<IResponseData<TGroup>>
      | MutatorCallback<IResponseData<TGroup>>,
    options?: { revalidate?: boolean }
  ) => Promise<IResponseData<TGroup> | undefined>;
  group: TGroup;
};
export type TGroupOnClick = {
  action: ActionType;
  row: TGroupMembers;
};
export type GroupManagementEditFormProps<T> = {
  setFilterQuery: (e: string) => void;
  filterQuery: string;
  setCurrentPage: (val: number) => void;
  handleClickAction: (
    action: TGroupOnClick['action'],
    row: TGroupOnClick['row']
  ) => void;
  pageSize: number;
  isLoading: boolean;
  currentPage: number;
  control: Control<TGroup>;
  handleSubmit: UseFormHandleSubmit<TGroup>;
  onSubmit: SubmitHandler<TGroup>;
  allGroupData: T;
  isDirty: boolean;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  updateGroup: T;
};

export type ActionType = 'users' | 'admins' | 'delete';
