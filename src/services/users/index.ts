import { HTTP_ANALYSES, http } from '@src/services/http';
import { IAxiosResponse, IServerResponse } from '@src/types/services';
import {
  IBodyUsersLogin,
  IResponseLogin,
  IDaAs,
  IUser,
  IBodyUsersLogout,
} from './types';
import {
  E_MALWARE_ANTIVIRUS,
  E_USERS_DAAS_DELETE,
  E_USERS_DAAS_RESET_ALL_USAGE,
  E_USERS_DAAS_RESET_USAGE,
  E_USERS_DAAS_UPDATE,
  E_USERS_LOGIN,
  E_USERS_PROFILE,
  E_UPDATE_USER,
  E_USERS_DELETE,
  E_USERS,
  E_USERS_LOGOUT,
  E_USER_GET_OTP,
  E_USERS_OTP_LOGIN,
} from './endpoint';
import { IDaasConfig } from '../config/types';

export const API_UPDATE_USER = (
  body: Partial<IUser>,
  userId: string | number
) => http.patch<IAxiosResponse<Partial<IUser>>>(E_UPDATE_USER(userId), body);

export const API_CREATE_USER = (body: IUser) =>
  http.post<IAxiosResponse<IUser>>(E_USERS, body);

export const API_DAAS_DELETE = (id: string) =>
  http.delete<IAxiosResponse<IDaAs[]>>(E_USERS_DAAS_DELETE(id));

export const API_USERS_DELETE = (id: number) =>
  http.delete<IAxiosResponse<number>>(E_USERS_DELETE(id));

interface IDaAsUpdated extends Omit<IDaAs, 'daas_configs'> {
  daas_configs: Partial<IDaasConfig>;
}

export const API_DAAS_UPDATE = (id: string, body: Partial<IDaAsUpdated>) =>
  http.patch<Partial<IDaAsUpdated>, IAxiosResponse<IDaAs[]>>(
    E_USERS_DAAS_UPDATE(id),
    body
  );

export const API_DAAS_RESET_USAGE_DAAS = (id: string) =>
  http.get(E_USERS_DAAS_RESET_USAGE(id));

export const API_DAAS_RESET_ALL_USAGE_DAAS = () =>
  http.get(E_USERS_DAAS_RESET_ALL_USAGE);
export const API_USERS_LOGOUT = (body: IBodyUsersLogout) =>
  http.post(E_USERS_LOGOUT, body);

export const API_USERS_LOGIN = (body: IBodyUsersLogin) =>
  http.post<IBodyUsersLogin, IServerResponse<IResponseLogin>>(
    E_USERS_LOGIN,
    body
  );
export const API_USERS_LOGIN_OTP = (body: IBodyUsersLogin) =>
  http.post<IBodyUsersLogin, IServerResponse<IResponseLogin>>(
    E_USERS_OTP_LOGIN,
    body
  );

export const API_USERS_PROFILE = () => http.get<IUser>(E_USERS_PROFILE);
export const API_USERS_OTP = (email: string) =>
  http.get<IUser>(E_USER_GET_OTP(email));

export const API_USERS_LICENSE_UPDATE = (body: any) =>
  http.patch(`/users/daas/${body.id}/`, body.data);

export const STORAGE_KEY_USER = 'user';

export const API_MALWARE_ANTIVIRUS_UPDATE = (
  id: string,
  body: Partial<IDaAsUpdated>
) =>
  HTTP_ANALYSES.patch<Partial<IDaAsUpdated>, IAxiosResponse<IDaAs[]>>(
    E_MALWARE_ANTIVIRUS(id),
    body
  );
