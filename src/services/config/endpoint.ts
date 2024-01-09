import { IPagination } from '@src/types/services';

export const E_CONFIG = '/config/';
export const E_UPDATE_DELETE_CONFIG = (id: number) => `/config/${id}/`;

export const E_DAAS_CONFIGS = '/config/daas_configs/';

export const E_DAAS_CONFIG_LIST = ({ pageSize, page, filter }: IPagination) =>
  `${E_DAAS_CONFIGS}${
    filter ? `?${filter}&` : '?'
  }page_size=${pageSize}&page=${page}`;

export const E_WHITE_LIST_FILES = '/config/white_list_files/';

export const E_DAAS_CONFIG_LIST_PAGINATION = ({
  pageSize,
  page,
  filter,
}: IPagination) =>
  `${E_WHITE_LIST_FILES}${
    filter ? `?${filter}&` : '?'
  }page_size=${pageSize}&page=${page}`;
