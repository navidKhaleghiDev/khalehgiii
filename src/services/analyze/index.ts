import { http_analyses } from '@src/services/http';
import { IAxiosResponse } from '@src/types/services';

import {
  E_ANALYZE_LOG,
  E_ANALYZE_LOG_UPDATE,
  E_ANALYZE_MIME_TYPE,
  E_ANALYZE_MIME_TYPE_DELETE,
} from './endpoint';
import { IAddConfigAnalyze } from './types';

export const API_ANALYZE_MIME_TYPE_DELETE = (id: number) =>
  http_analyses.delete<IAxiosResponse<any>>(E_ANALYZE_MIME_TYPE_DELETE(id));

export const API_ANALYZE_MIME_TYPE_CREATE = (body: any) =>
  http_analyses.post<IAxiosResponse<any>>(E_ANALYZE_MIME_TYPE, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const API_CONFIG_ANALYZE_LOG = () =>
  http_analyses.get<IAxiosResponse<IAddConfigAnalyze[]>>(E_ANALYZE_LOG);

export const API_ANALYZE_LOG_UPDATE = (body: IAddConfigAnalyze) =>
  http_analyses.patch<IAddConfigAnalyze, IAxiosResponse<IAddConfigAnalyze[]>>(
    E_ANALYZE_LOG_UPDATE(body.id as number),
    body
  );

export const API_ANALYZE_LOG_CREATE = (body: IAddConfigAnalyze) =>
  http_analyses.post<IAddConfigAnalyze, IAxiosResponse<IAddConfigAnalyze[]>>(
    E_ANALYZE_LOG,
    body
  );
