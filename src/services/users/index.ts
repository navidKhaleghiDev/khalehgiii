import { http } from "@src/services/http";
import { IAxiosResponse, IServerResponse } from "@src/types/services";
import { IBodyUsersLogin, IResponseLogin, IDaAs } from "./types";
import { E_USERS_DAAS, E_USERS_DAAS_DELETE, E_USERS_LOGIN } from "./endpoint";

export const API_DAAS_LIST = ({ username, password }: any) =>
  http.get<IAxiosResponse<IDaAs[]>>(E_USERS_DAAS({ pageSize: 1000, page: 1 }), {
    auth: {
      username,
      password,
    },
  });

export const API_DAAS_DELETE = ({ username, password, id }: any) =>
  http.delete<IAxiosResponse<IDaAs[]>>(E_USERS_DAAS_DELETE(id), {
    auth: {
      username,
      password,
    },
  });

export const API_USERS_LOGIN = (body: IBodyUsersLogin) =>
  http.post<IBodyUsersLogin, IServerResponse<IResponseLogin>>(
    E_USERS_LOGIN,
    body
  );

export const STORAGE_KEY_USER = "user";
