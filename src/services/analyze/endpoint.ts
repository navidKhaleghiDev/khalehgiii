import { IPagination } from "@src/types/services";

export const E_ANALYZE_SCAN = (userEmail: string) =>
  `analyze/scan/?username=${userEmail}`;

export const E_ANALYZE_MIME_TYPE = "analyze/mime_types/";
export const E_ANALYZE_MIME_TYPE_DELETE = (id: number) =>
  `analyze/mime_types/${id}/`;

export const E_ANALYZE_SCAN_STATS = "analyze/scan_stats/";

export const E_ANALYZE_LOG = "analyze/log/";
export const E_ANALYZE_LOG_UPDATE = (id: number) => `${E_ANALYZE_LOG}${id}/`;

export const E_ANALYZE_SCAN_PAGINATION = (
  userEmail: string,
  { pageSize, page, filter }: IPagination
) =>
  `analyze/scan/?username=${userEmail}&${
    filter ? `${filter}&` : ""
  }page_size=${pageSize}&page=${page}`;

export const E_ANALYZE_SCAN_USER_PAGINATION = (userEmail: string) =>
  `analyze/scan/?username=${userEmail}`;

export const E_UBA = `analyze/mal_uba/`;

export const E_UBA_LIST_PAGINATION = ({
  pageSize,
  page,
  filter,
}: IPagination) =>
  `${E_UBA}${filter ? `?${filter}&` : "?"}page_size=${pageSize}&page=${page}`;
