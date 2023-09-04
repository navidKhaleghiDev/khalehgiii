import axios, { AxiosResponse } from 'axios';
import { Http } from '../http';

export const httpServer = new Http(import.meta.env.VITE_SERVER_BASE_URL);

export const fetcherServer = <Data>(url: string) =>
  axios.get<Data, AxiosResponse<Data>>(url, {
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  });
