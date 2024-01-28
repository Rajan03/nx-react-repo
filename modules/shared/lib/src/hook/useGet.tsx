import { useQuery } from 'react-query';
import type { UseQueryOptions, UseQueryResult } from 'react-query';
import { APIClient } from '../api/api-client';

type GetRequestOptions = {
  queryKey: string;
  endPoint: string;
  config?: Omit<UseQueryOptions, 'queryKey' | 'querfn'>;
};

type GetReturn<R> = {
  data: R;
  error: Error;
  isLoading: boolean;
  isFetching: boolean;
};

/**
 * useGet hook to fetch data from API using GET method and react-query
 * Type R is the response type from the API.
 *
 * @param props key: string, endPoint: string, config?: Omit<UseQueryOptions, 'queryKey' | 'querfn'>
 * @returns UseQueryResult<R, Error> & GetReturn<R>
 *
 * @example const result = useGet<ResponseType>({ queryKey: 'key', endPoint: 'endpoint', config: {} });
 */
export function useGet<R>(props: GetRequestOptions): GetReturn<R> {
  const { queryKey, endPoint, config } = props;

  const result = useQuery(
    queryKey,
    () => GetRequest<R>(endPoint),
    config
  );

  return result as UseQueryResult<R, Error> & GetReturn<R>;
}

async function GetRequest<R>(endPoint: string): Promise<R> {
  return await APIClient.getInstance().get<R>(endPoint);
}