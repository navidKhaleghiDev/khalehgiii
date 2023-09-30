import { IPagination } from "@src/types/services";

export const E_USERS_DAAS = ({ pageSize, page, filter }: IPagination) =>
  `/users/daas/${
    filter ? `?${filter}&` : "?"
  }page_size=${pageSize}&page=${page}`;

export const E_USERS_DAAS_DELETE = (id: string) => `/users/daas/${id}/`;
export const E_USERS_PROFILE = "users/profile/";
export const E_USERS_LOGIN = "/users/login/";
