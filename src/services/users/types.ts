export enum ETimeLimitDuration {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  PERMANENTLY = "PERMANENTLY",
}
export interface IDaAs {
  id?: string;
  email: string;
  http_port: number | string;
  https_port: number | string;
  created_at: string;
  last_uptime: string;
  time_limit_duration: ETimeLimitDuration;
  time_limit_value: number;
  usage: number;
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

export interface IUser extends IBodyUsersLogin, IResponseLogin {}
