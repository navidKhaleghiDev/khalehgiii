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
