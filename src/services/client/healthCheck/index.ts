import { http } from '@src/services/http';
// import { IServerResponse } from '@src/types/services';
import { IHealthCheck } from './types';
import { E_HEALTH_CHECK } from './endpoint';

export const API_GET_HEALTH_CHECK = () =>
  http.get<IHealthCheck>(E_HEALTH_CHECK);
