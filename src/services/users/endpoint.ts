import { IPagination } from '@src/types/services';
import { E_ANALYZE_SCAN_STATS } from '../analyze/endpoint';

// users endpoints
export const E_USERS = '/users/';
export const E_USERS_OTP = '/users/otp_gen';
export const E_USERS_DAAS = '/users/daas';
export const E_USERS_GROUPS = '/users/groups/';
export const E_USERS_ONLINE_ASSISTANCE = '/users/online_assistance/';
export const E_USERS_LICENSES = '/users/license/';

export const USERS_GROUPS_GET = (id: string) => `${E_USERS_GROUPS}${id}/`;
export const E_USERS_UPDATE = (id: string) => `${E_USERS}${id}/`;
export const E_USERS_DELETE = (id: number) => `${E_USERS}${id}/`;
export const E_UPDATE_USER = (id: string | number) => `${E_USERS}${id}/`;
export const E_USER_GET_OTP = (email: string) =>
  `${E_USERS_OTP}?email=${email}`;
export const E_USERS_PAGINATION = ({ pageSize, page, filter }: IPagination) =>
  `${E_USERS}?page_size=${pageSize}&page=${page}${filter ? `&${filter}` : ''}`;

// users daas endpoints
export const E_USERS_DAAS_PAGINATION = ({
  pageSize,
  page,
  filter,
}: IPagination) =>
  `/users/daas/${
    filter ? `?${filter}&` : '?'
  }page_size=${pageSize}&page=${page}`;

export const E_USERS_DAAS_DELETE = (id: string) => `/users/daas/${id}/`;
export const E_USERS_DAAS_UPDATE = (id: string) => `/users/daas/${id}/`;

export const E_USERS_DAAS_RESET_USAGE = (id: string) =>
  `/users/reset_usage/${id}/`;

export const E_KNOWLEDGE_MANAGEMENT = (id: string) =>
  `/users/knowledge_management/?id=${id}`;

export const E_USERS_DAAS_RESET_ALL_USAGE = '/users/reset_usage/';
export const E_USERS_LOGOUT = `users/logout/`;
export const E_USERS_LOGOUT_ONLINE_ASSISTANCE = `/users/logout_online_assistance/`;

export const E_USERS_LICENSE = '/users/daas?is_recording=True';

export const E_ANALYZE_REPORTS = (start_date: string, end_date: string) =>
  `${E_ANALYZE_SCAN_STATS}?start_date=${start_date}&end_date=${end_date}`;

export const E_USERS_DAAS_UPDATE_USAGE = 'users/daas/update_usage/';
export const E_USERS_KEEPALIVE = 'users/keepalive_online_assistance/';

export const E_USERS_PROFILE = 'users/profile/';
export const E_USERS_LOGIN = '/users/login/';
export const E_USERS_OTP_LOGIN = '/users/otp_login/';

export const E_MALWARE_ANTIVIRUS = (id: string) =>
  `/analyze/scanners_config/${id}/`;
