import { AxiosResponse } from 'axios';
import { HTTP_ANALYSES, http } from '@src/services/http';
import { GroupListUpdateParams } from '@src/pages/NotUsed/GroupManagement/type';
import { AxiosResponseData, ServerResponse } from '@src/types/services';
import { KeysType } from '@src/pages/NotUsed/License/SettingMalwareCard/type';
import {
  BodyUsersLogin,
  ResponseLogin,
  DaAsParams,
  UserParams,
  BodyUsersLogout,
  GroupParams,
  ResponseAssistance,
  BodyAssistance,
} from './types';
import {
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
  E_USERS_GROUPS,
  USERS_GROUPS_GET,
  E_USERS_LOGOUT_ONLINE_ASSISTANCE,
  E_KNOWLEDGE_MANAGEMENT,
  E_USERS_ONLINE_ASSISTANCE,
  E_GET_RECORDED_VIDEO,
} from './endpoint';
import { DaasConfig } from '../config/types';
import { E_MALWARE_ANTIVIRUS } from '../analyze/endpoint';

export const API_UPDATE_USER = (
  body: Partial<UserParams>,
  userId: string | number
) =>
  http.patch<AxiosResponseData<Partial<UserParams>>>(
    E_UPDATE_USER(userId),
    body
  );

export const API_CREATE_USER = (body: UserParams) =>
  http.post<AxiosResponseData<UserParams>>(E_USERS, body);
export const API_USERS_GROUPS_CREATE = (body: GroupListUpdateParams) =>
  http.post<AxiosResponseData<GroupListUpdateParams>>(E_USERS_GROUPS, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const API_USERS_GROUPS_UPDATE = (body: any, id: string | number) =>
  http.patch<AxiosResponseData<GroupListUpdateParams>>(
    USERS_GROUPS_GET(id),
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const API_USERS_GROUPS_GET = (id: string) =>
  http.get<AxiosResponseData<GroupParams>>(USERS_GROUPS_GET(id));

export const API_DAAS_DELETE = (id: string) =>
  http.delete<AxiosResponseData<DaAsParams[]>>(E_USERS_DAAS_DELETE(id));

export const API_USERS_DELETE = (id: number) =>
  http.delete<AxiosResponseData<number>>(E_USERS_DELETE(id));

interface DaAsUpdated extends Omit<DaAsParams, 'daas_configs'> {
  daas_configs: Partial<DaasConfig>;
}

export const API_DAAS_UPDATE = (id: string, body: Partial<DaAsUpdated>) =>
  http.patch<Partial<DaAsUpdated>, AxiosResponseData<DaAsParams[]>>(
    E_USERS_DAAS_UPDATE(id),
    body
  );

export const API_DAAS_RESET_USAGE_DAAS = (id: string) =>
  http.get(E_USERS_DAAS_RESET_USAGE(id));

export const API_DAAS_RESET_ALL_USAGE_DAAS = () =>
  http.get(E_USERS_DAAS_RESET_ALL_USAGE);

export const API_USERS_LOGOUT = (body: BodyUsersLogout) =>
  http.post(E_USERS_LOGOUT, body);

export const API_USERS_LOGOUT_ONLINE_ASSISTANCE = () =>
  http.get(E_USERS_LOGOUT_ONLINE_ASSISTANCE);

export const API_USERS_LOGIN = (body: BodyUsersLogin) =>
  http.post<BodyUsersLogin, ServerResponse<ResponseLogin>>(E_USERS_LOGIN, body);
export const API_USERS_LOGIN_OTP = (body: BodyUsersLogin) =>
  http.post<BodyUsersLogin, ServerResponse<ResponseLogin>>(
    E_USERS_OTP_LOGIN,
    body
  );

export const API_USERS_PROFILE = () => http.get<UserParams>(E_USERS_PROFILE);
export const API_USERS_OTP = (email: string) =>
  http.get<UserParams>(E_USER_GET_OTP(email));

export const API_USERS_LICENSE_UPDATE = (body: any) =>
  http.patch(`/users/daas/${body.id}/`, body);

export const STORAGE_KEY_USER = 'user';

export const API_MALWARE_ANTIVIRUS_UPDATE = (
  id: number,
  body: KeysType
): Promise<AxiosResponse<KeysType>> => {
  return HTTP_ANALYSES.patch(E_MALWARE_ANTIVIRUS(id), body);
};

export const API_KNOWLEDGE_MANAGEMENT = (id: string) =>
  http.get(E_KNOWLEDGE_MANAGEMENT(id), {
    headers: {
      'Content-Type': 'video/mp4',
    },
    responseType: 'blob',
  });
export const API_ONLINE_ASSISTANCE = (body: { id: string }) => {
  return http.post<BodyAssistance, ServerResponse<ResponseAssistance>>(
    E_USERS_ONLINE_ASSISTANCE,
    body
  );
};
export const API_DELETE_GROUP = (id: string) => {
  return http.delete<BodyAssistance, ServerResponse<ResponseAssistance>>(
    USERS_GROUPS_GET(id)
  );
};
export const API_GET_RECORDED_VIDEO = (body: any) =>
  http.get(E_GET_RECORDED_VIDEO(body), {
    headers: {
      'Content-Type': 'video/mp4',
    },
    responseType: 'blob',
  });
