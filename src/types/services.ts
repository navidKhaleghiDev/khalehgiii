export interface IServerResponse<T> {
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
  filter: string;
}

export type IAxiosResponse<T> = T;
