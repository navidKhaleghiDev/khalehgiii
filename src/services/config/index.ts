import { HTTP_ANALYSES, http } from '@src/services/http';
import { AxiosResponseData } from '@src/types/services';
import { FormDate, FormDateTimeFrame } from '@src/pages/Reports/types';
import { AddConfig, DaasConfig, FileType } from './types';
import {
  E_CONFIG,
  E_DAAS_CONFIGS,
  E_UPDATE_DELETE_CONFIG,
  E_WHITE_LIST_FILES,
} from './endpoint';
import { E_ANALYZE_REPORTS } from '../analyze/endpoint';

export const API_ADD_CONFIG = (body: AddConfig) =>
  http.post<AddConfig, AxiosResponseData<AddConfig[]>>(E_CONFIG, body);

export const API_ADD_UPDATE = (body: AddConfig) =>
  http.patch<AddConfig, AxiosResponseData<AddConfig[]>>(
    E_UPDATE_DELETE_CONFIG(body.id as number),
    body
  );

export const API_GET_REPORTS = (body: FormDateTimeFrame) =>
  HTTP_ANALYSES.get<FormDate>(
    `${E_ANALYZE_REPORTS(body.start_date, body.end_date)}`
  );
export const API_CONFIG_LIST = () =>
  http.get<AxiosResponseData<AddConfig[]>>(E_CONFIG);

export const API_DELETE_FILE_TYPE = (id: number) =>
  http.delete<AxiosResponseData<any>>(`${E_WHITE_LIST_FILES}${id}`);

export const API_UPDATE_FILE_TYPE = (body: FileType) =>
  http.patch<AxiosResponseData<any>>(`${E_WHITE_LIST_FILES}${body.id}/`, body);

export const API_CREATE_FILE_TYPE = (body: FileType) =>
  http.post<AxiosResponseData<any>>(`${E_WHITE_LIST_FILES}`, body);

export const API_UPDATE_DAAS_CONFIG = (body: DaasConfig) =>
  http.patch<AxiosResponseData<any>>(`${E_DAAS_CONFIGS}${body.id}/`, body);
