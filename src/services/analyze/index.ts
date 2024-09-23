import { HTTP_ANALYSES } from '@src/services/http';
import { IAxiosResponse } from '@src/types/services';

import {
  E_ANALYZE_DOWNLOAD_FILE,
  E_ANALYZE_LOG,
  E_ANALYZE_LOG_UPDATE,
  E_ANALYZE_MIME_TYPE,
  E_ANALYZE_MIME_TYPE_DELETE,
  E_ANALYZE_SCAN_STATUS_UPDATE,
} from './endpoint';
import {
  IAddConfigAnalyze,
  IAddConfigAnalyzeDownload,
  IScannedFile,
} from './types';

export const API_ANALYZE_MIME_TYPE_DELETE = (id: number) =>
  HTTP_ANALYSES.delete<IAxiosResponse<any>>(E_ANALYZE_MIME_TYPE_DELETE(id));

export const API_ANALYZE_MIME_TYPE_CREATE = (body: any) =>
  HTTP_ANALYSES.post<IAxiosResponse<any>>(E_ANALYZE_MIME_TYPE, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const API_CONFIG_ANALYZE_LOG = () =>
  HTTP_ANALYSES.get<IAxiosResponse<IAddConfigAnalyze[]>>(E_ANALYZE_LOG);

export const API_ANALYZE_LOG_UPDATE = (body: IAddConfigAnalyze) =>
  HTTP_ANALYSES.patch<IAddConfigAnalyze, IAxiosResponse<IAddConfigAnalyze[]>>(
    E_ANALYZE_LOG_UPDATE(body.id as number),
    body
  );
export const API_ANALYZE_DOWNLOAD_FILE = (body: IAddConfigAnalyzeDownload) =>
  HTTP_ANALYSES.get(E_ANALYZE_DOWNLOAD_FILE(body.username, body.file_hash), {
    headers: {
      'Content-Type': body.file_content_type,
    },
    responseType: 'blob',
  });
export const API_ANALYZE_SCAN_STATUS_UPDATE = (body: IScannedFile) =>
  HTTP_ANALYSES.patch(E_ANALYZE_SCAN_STATUS_UPDATE(body), {
    body,
  });

export const API_ANALYZE_LOG_CREATE = (body: IAddConfigAnalyze) =>
  HTTP_ANALYSES.post<IAddConfigAnalyze, IAxiosResponse<IAddConfigAnalyze[]>>(
    E_ANALYZE_LOG,
    body
  );
