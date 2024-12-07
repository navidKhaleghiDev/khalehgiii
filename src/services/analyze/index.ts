import { HTTP_ANALYSES } from '@src/services/http';
import { AxiosResponseData } from '@src/types/services';

import {
  E_ANALYZE_DOWNLOAD_FILE,
  E_ANALYZE_LOG,
  E_ANALYZE_LOG_UPDATE,
  E_ANALYZE_MIME_TYPE,
  E_ANALYZE_MIME_TYPE_DELETE,
  E_ANALYZE_SCAN_STATUS_UPDATE,
} from './endpoint';
import {
  AddConfigAnalyze,
  AddConfigAnalyzeDownload,
  ScannedFile,
} from './types';

export const API_ANALYZE_MIME_TYPE_DELETE = (id: number) =>
  HTTP_ANALYSES.delete<AxiosResponseData<any>>(E_ANALYZE_MIME_TYPE_DELETE(id));

export const API_ANALYZE_MIME_TYPE_CREATE = (body: any) =>
  HTTP_ANALYSES.post<AxiosResponseData<any>>(E_ANALYZE_MIME_TYPE, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const API_CONFIG_ANALYZE_LOG = () =>
  HTTP_ANALYSES.get<AxiosResponseData<AddConfigAnalyze[]>>(E_ANALYZE_LOG);

export const API_ANALYZE_LOG_UPDATE = (body: AddConfigAnalyze) =>
  HTTP_ANALYSES.patch<AddConfigAnalyze, AxiosResponseData<AddConfigAnalyze[]>>(
    E_ANALYZE_LOG_UPDATE(body.id as number),
    body
  );
export const API_ANALYZE_DOWNLOAD_FILE = (body: AddConfigAnalyzeDownload) =>
  HTTP_ANALYSES.get(E_ANALYZE_DOWNLOAD_FILE(body.username, body.file_hash), {
    headers: {
      'Content-Type': body.file_content_type,
    },
    responseType: 'blob',
  });
export const API_ANALYZE_SCAN_STATUS_UPDATE = (body: ScannedFile) =>
  HTTP_ANALYSES.patch(E_ANALYZE_SCAN_STATUS_UPDATE(body), {
    body,
  });

export const API_ANALYZE_LOG_CREATE = (body: AddConfigAnalyze) =>
  HTTP_ANALYSES.post<AddConfigAnalyze, AxiosResponseData<AddConfigAnalyze[]>>(
    E_ANALYZE_LOG,
    body
  );
