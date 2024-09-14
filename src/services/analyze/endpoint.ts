import { IPagination } from '@src/types/services';
import { IScannedFile } from './types';

const E_ANALYZE_SCANS = 'analyze/scan/';

export const E_ANALYZE_SCAN = (userEmail: string) =>
  `${E_ANALYZE_SCANS}?username=${userEmail}`;

export const E_ANALYZE_SCAN_STATUS_UPDATE = (body: IScannedFile) =>
  `${E_ANALYZE_SCANS}${body.id}/`;

export const E_ANALYZE_MIME_TYPE = 'analyze/mime_types/';
export const E_ANALYZE_MIME_TYPE_DELETE = (id: number) =>
  `analyze/mime_types/${id}/`;

export const E_ANALYZE_SCAN_STATS = 'analyze/scan_stats/';

export const E_ANALYZE_LOG = 'analyze/log/';
export const E_ANALYZE_LOG_UPDATE = (id: number) => `${E_ANALYZE_LOG}${id}/`;

export const E_ANALYZE_SCAN_PAGINATION = (
  userEmail: string,
  { pageSize, page, filter }: IPagination
) =>
  `${E_ANALYZE_SCANS}?username=${userEmail}&${
    filter ? `${filter}&` : ''
  }page_size=${pageSize}&page=${page}`;

export const E_ANALYZE_SCAN_USER_PAGINATION = (userEmail: string) =>
  `${E_ANALYZE_SCANS}?username=${userEmail}`;
export const E_ANALYZE_DOWNLOAD_FILE = (username: string, file_hash: string) =>
  `analyze/download/?username=${username}&file_hash=${file_hash}`;

export const E_ANALYZE_REPORTS = (start_date: string, end_date: string) =>
  `${E_ANALYZE_SCAN_STATS}?start_date=${start_date}&end_date=${end_date}`;

export const E_UBA = `analyze/mal_uba/`;

export const E_UBA_LIST_PAGINATION = ({
  pageSize,
  page,
  filter,
}: IPagination) =>
  `${E_UBA}${filter ? `?${filter}&` : '?'}page_size=${pageSize}&page=${page}`;

export const E_ANALYZE_SCANNER = 'analyze/scanners_config/';
export const E_MALWARE_ANTIVIRUS = (id: number) =>
  `/analyze/scanners_config/${id}/`;
