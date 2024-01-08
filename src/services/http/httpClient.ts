import { FetcherResponse } from 'swr/_internal';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { AxiosResponse } from 'axios';
import { http, AxiosRequestConfig } from '.';

export type MutationPostOptions<T> = SWRMutationConfiguration<
  T,
  unknown,
  string
>;

const useGet = <ResponseData = unknown, Error = unknown>(
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

function usePost<T = object, R = AxiosResponse<T>>(
  mutationURL: string,
  body: T,
  options?: MutationPostOptions<T>
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

export { useGet, usePost };
