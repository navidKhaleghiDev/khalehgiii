import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

import { IResponsePagination } from '@src/types/services';

type SwrResponseType<T> = {
  data: IResponsePagination<T> | undefined;
  error: string;
  isLoading: boolean;
  isValidating: boolean;
  count?: IResponsePagination<T>['data']['count'];
  resultData?: IResponsePagination<T>['data']['results'];
  mutate: SWRResponse<IResponsePagination<T>, string>['mutate'];
};

export function useCustomSwr<T>(
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
