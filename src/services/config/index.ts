import { http } from "@src/services/http";
import { IAxiosResponse } from "@src/types/services";
import { IAddConfig } from "./types";
import { E_CONFIG, E_UPDATE_DELETE_CONFIG } from "./endpoint";

export const API_ADD_CONFIG = ({ username, password }: any, body: IAddConfig) =>
  http.post<IAddConfig, IAxiosResponse<IAddConfig[]>>(E_CONFIG, body, {
    auth: {
      username,
      password,
    },
  });

export const API_ADD_UPDATE = ({ username, password }: any, body: IAddConfig) =>
  http.patch<IAddConfig, IAxiosResponse<IAddConfig[]>>(
    E_UPDATE_DELETE_CONFIG(body.id as number),
    body,
    {
      auth: {
        username,
        password,
      },
    }
  );

export const API_CONFIG_LIST = ({ username, password }: any) =>
  http.get<IAxiosResponse<IAddConfig[]>>(E_CONFIG, {
    auth: {
      username,
      password,
    },
  });
