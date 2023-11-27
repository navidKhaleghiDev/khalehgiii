import { IPagination } from "@src/types/services";

export const E_ANALYZE_SCAN = (userEmail: string) =>
  `analyze/scan/?username=${userEmail}`;

export const E_ANALYZE_SCAN_PAGINATION = (
  userEmail: string,
  { pageSize, page, filter }: IPagination
) =>
  `analyze/scan/?username=${userEmail}&${
    filter ? `?${filter}&` : ""
  }page_size=${pageSize}&page=${page}`;

export const E_UBA = `analyze/mal_uba/`;

export const E_UBA_LIST_PAGINATION = ({
  pageSize,
  page,
  filter,
}: IPagination) =>
  `${E_UBA}${filter ? `?${filter}&` : "?"}page_size=${pageSize}&page=${page}`;
