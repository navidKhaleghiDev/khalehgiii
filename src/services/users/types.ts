export enum ETimeLimitDuration {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  PERMANENTLY = "PERMANENTLY",
}

export enum EAccessMode {
  HAS_ACCESS = "HAS_ACCESS",
  NO_ACCESS = "NO_ACCESS",
}
export interface IDaAs {
  id?: string;
  email: string;
  http_port: number | string;
  https_port: number | string;
  created_at: string;
  last_uptime: string;
  time_limit_duration: ETimeLimitDuration;
  time_limit_value_in_hour: number;
  is_running?: boolean | string;
  usage_in_minute: number | string;
  access_mode: EAccessMode | string;
}

export interface IBodyUsersLogin {
  email: string;
  password: string;
  is_admin: boolean;
}
export interface IResponseLogin {
  info?: string;
  http?: string;
  https?: string;
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: 1;
  email: string;
  last_login?: string;
  is_superuser?: boolean;
  exceeded_usage: boolean;
  base_url?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
  http_port?: number;
  https_port?: number;
  time_limit_duration?: ETimeLimitDuration;
  time_limit_value_in_hour?: number;
  last_uptime?: string;
  is_running?: boolean;
  exceeded_time_limit?: boolean;
  usage_in_minute?: number;
  created_at?: string;
}
