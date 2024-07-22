export interface IServerResponse<T> {
  data: T;
}

export interface ISwrResponse<T> {
  data: T;
}

export interface IServerResponsePagination<T> {
  data: {
    count: number;
    next: string;
    previous: string;
    results: T;
  };
}
export interface ISessionResponsePagination<T> {
  data: {
    count?: number;
    next?: string;
    previous?: string;
    history: T;
    today: T;
  };
}

export interface IResponsePagination<T> {
  data: {
    online_users: number;
    online_recording_sessions: number;
    count: number;
    next: string;
    previous: string;
    results: T[];
  };
}

export interface IServerResponseList<T> {
  data: {
    count: number;
    next: string;
    previous: string;
    results: T;
  };
}

export interface IPagination {
  pageSize: number;
  page: number;
  filter?: string;
}

export type IAxiosResponse<T> = T;

export interface IResponseData<T> {
  data: T;
}
