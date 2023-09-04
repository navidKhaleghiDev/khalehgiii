export interface IDaAs {
  id?: number;
  email: string;
  http_port: number | string;
  https_port: number | string;
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
}

export interface IUser extends IBodyUsersLogin, IResponseLogin {}
