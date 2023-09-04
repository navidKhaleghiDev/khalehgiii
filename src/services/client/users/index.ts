import { http } from "@src/services/http";
import { IServerResponse } from "@src/types/services";
import { E_USERS_LOGIN } from "./endpoint";
import { IBodyUsersLogin, IResponseLogin } from "./types";

export const API_USERS_LOGIN = (body: IBodyUsersLogin) =>
  http.post<IBodyUsersLogin, IServerResponse<IResponseLogin>>(
    E_USERS_LOGIN,
    body
  );

export const STORAGE_KEY_USER = "user";
