import { http } from "@src/services/http";
import { IAxiosResponse, IServerResponse } from "@src/types/services";
import { IBodyUsersLogin, IResponseLogin, IDaAs, IUser } from "./types";
import {
  E_USERS_DAAS,
  E_USERS_DAAS_DELETE,
  E_USERS_DAAS_UPDATE,
  E_USERS_LOGIN,
  E_USERS_PROFILE,
} from "./endpoint";

export const API_DAAS_LIST = ({ username, password }: any) =>
  http.get<IAxiosResponse<IDaAs[]>>(E_USERS_DAAS({ pageSize: 1000, page: 1 }), {
    auth: {
      username,
      password,
    },
  });

export const API_DAAS_DELETE = (id: string) =>
  http.delete<IAxiosResponse<IDaAs[]>>(E_USERS_DAAS_DELETE(id));

export const API_DAAS_UPDATE = (id: string, body: any) =>
  http.patch<IAxiosResponse<IDaAs[]>>(E_USERS_DAAS_UPDATE(id), body);

export const API_USERS_LOGIN = (body: IBodyUsersLogin) =>
  http.post<IBodyUsersLogin, IServerResponse<IUser>>(E_USERS_LOGIN, body);

export const API_USERS_PROFILE = () => http.get<IUser>(E_USERS_PROFILE);

export const STORAGE_KEY_USER = "user";
