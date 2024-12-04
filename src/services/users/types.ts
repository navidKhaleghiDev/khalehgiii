import { NumberObjectArray } from '@src/types/global';
import { UserPermissionsProps } from '@src/types/permissions';
// eslint-disable-next-line import/no-cycle
import { DaasConfig } from '../config/types';

export enum TimeLimitDuration {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
  PERMANENTLY = 'PERMANENTLY',
  TEMPORARY = 'TEMPORARY',
}

export enum AccessMode {
  HAS_ACCESS = 'HAS_ACCESS',
  NO_ACCESS = 'NO_ACCESS',
}

export interface DaAsParams {
  id: string;
  is_lock: boolean;
  daas_configs: DaasConfig;
  allowed_files_type_for_download: Record<string, number>;
  allowed_files_type_for_upload: Record<string, number>;
  email: string;
  http_port: number | string;
  https_port: number | string;
  created_at: string;
  last_uptime: string;
  is_running?: boolean | string;
  exceeded_usage?: boolean | string;
  usage_in_minute: number | string;
  forbidden_upload_files: string[];
  forbidden_download_files: string[];
  extra_allowed_download_files: Record<string, number>;
  extra_allowed_upload_files: Record<string, number>;
  daas_version: string;
  chatroom_privileged: boolean;
  member_of: NumberObjectArray;
  admin_group_of: NumberObjectArray;
  base_url: string;
  container_id: string;
  last_login_ip: string;
}

export interface BodyUsersLogin {
  email: string;
  password: string;
  totp?: string;
  // is_admin: boolean;
}
export interface BodyUsersLogout {
  refresh_token: string;
}

export interface ResponseLogin {
  info?: string;
  http?: string;
  https?: string;
  access_token: string;
  refresh_token: string;
}

export interface UserParams {
  id: number | string;
  user_permissions?: UserPermissionsProps[];
  password?: string;
  last_login?: string;
  is_superuser?: boolean;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
  email?: string;
  is_meta_admin?: boolean;
  // .....
  exceeded_usage?: boolean;
  base_url?: string;
  http_port?: number;
  https_port?: number;
  time_limit_duration?: TimeLimitDuration;
  time_limit_value_in_hour?: number;
  last_uptime?: string;
  is_running?: boolean;
  exceeded_time_limit?: boolean;
  usage_in_minute?: number;
  created_at?: string;
  totp_enable?: boolean;
  secret?: string | undefined;
  totp_secret?: string | null;
  admin_group_of?: NumberObjectArray;
  online_assistance: UserOnlineAssistance | null;
}

export type UserOnlineAssistance = {
  admin?: string;
  group_name: string;
  user: string;
  user_http_address: string;
  user_https_address: string;
};
export type GroupMembersParams = {
  id: string;
  email: string;
  is_running?: boolean;
  has_online_assistance?: boolean;
};

export type GroupParams = {
  id?: string;
  users: GroupMembersParams[];
  admins: GroupMembersParams[];
  name: string;
  created_at?: string;
  updated_at?: string;
  image?: string | Blob | undefined;
  online_users?: number;
};

export type UpdateGroupPayload = {
  users: string[] | GroupParams['users'];
  admins: string[] | GroupParams['admins'];
  name: string;
};

export type KnowledgeManagementUserModel = { id: string; email: string };

export type OnlineAssistanceModel = {
  id: number;
  created_at: string;
  admin_ip_addr: string | null;
  in_use: boolean;
  last_uptime: string;
  group_name?: string;
  duration_time: number;
  knowledge_management_record_path: string;
  admin: KnowledgeManagementUserModel;
  user: KnowledgeManagementUserModel;
};
export interface ResponseAssistance {
  http: string;
  https: string;
}
export interface BodyAssistance {
  id: string;
}

export type KeysType = {
  [key: string]: boolean;
};

export type UsersListParams = { id: string; email: string }[];

export type GroupListUpdateParams = {
  users: UsersListParams;
  admins: UsersListParams;
  name: string;
};
