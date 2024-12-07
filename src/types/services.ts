export interface ServerResponse<T> {
  data: T;
}

export interface SwrResponse<T> {
  data: T;
}

export interface ServerResponsePagination<T> {
  data: {
    count: number;
    next: string;
    previous: string;
    results: T;
  };
}
export interface SessionResponsePagination<T> {
  data: {
    count?: number;
    next?: string;
    previous?: string;
    history: T;
    today: T;
  };
}

export interface ResponsePagination<T> {
  data: {
    online_users: number;
    online_recording_sessions: number;
    count: number;
    next: string;
    previous: string;
    results: T[];
  };
}

export interface ServerResponseList<T> {
  data: {
    count: number;
    next: string;
    previous: string;
    results: T;
  };
}

export interface Pagination {
  pageSize: number;
  page: number;
  filter?: string;
}

export type AxiosResponseData<T> = T;

export interface ResponseData<T> {
  data: T;
}
