import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { FetcherResponse } from 'swr/_internal';
import { AxiosResponse } from 'axios';

import { IResponsePagination } from '@src/types/services';

import { http, AxiosRequestConfig } from '.';

export type MutationPostOptions<T> = SWRMutationConfiguration<
  T,
  unknown,
  string
>;

type SwrResponseType<T> = {
  data: IResponsePagination<T> | undefined;
  error: string;
  isLoading: boolean;
  isValidating: boolean;
  count: IResponsePagination<T>['data']['count'];
  resultData: IResponsePagination<T>['data']['results'];
  mutate: SWRResponse<IResponsePagination<T>, string>['mutate'];
};

export const useGet = <ResponseData = unknown, Error = unknown>(
  url: string | null,
  config?: SWRConfiguration
) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    ResponseData,
    Error
  >(
    url,
    (getUrl, getConfig?: AxiosRequestConfig) => http.get(getUrl, getConfig),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
      ...config,
    }
  );

  return { data, error, isLoading, isValidating, mutate };
};

export function usePost<T = object, R = AxiosResponse<T>>(
  mutationURL: string,
  body: T,
  options?: any
) {
  const post = (_url: string) =>
    http.post<T, R>(_url, body) as FetcherResponse<T>;
  const {
    data: responseData,
    error,
    trigger,
    isMutating,
  } = useSWRMutation(mutationURL, post, options);

  return { data: responseData, error, trigger, isMutating };
}

// Handel API request that has pagination
export function useGetPagination<T>(
  endPoint: string,
  fetcher: (url: string) => Promise<IResponsePagination<T>>,
  options?: SWRConfiguration
): SwrResponseType<T> {
  const { data, error, isValidating, mutate, isLoading } = useSWR<
    IResponsePagination<T>
  >(endPoint, fetcher, options);

  const count = data?.data?.count ?? 0;
  const resultData = data?.data?.results ?? [];

  return {
    data,
    error,
    count,
    resultData,
    isLoading,
    isValidating,
    mutate,
  };
}
