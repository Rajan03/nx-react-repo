import { useMutation } from 'react-query';
import type { UseMutationResult, QueryKey, UseMutationOptions } from 'react-query';
import { APIClient } from '../api/api-client';

export enum RequestType {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type MutateRequestOptions<R, D> = {
  queryKey: string;
  endPoint: string;
  requestType: RequestType;
  data: D;
  config?: Omit<
    UseMutationOptions<R, Error, unknown, QueryKey>,
    'mutationFn' | 'mutationKey'
  >;
};

/**
 * usePost hook to post data from API using POST method and react-query
 * Type R is the response type from the API.
 *
 * @param props endPoint: string, config?: Omit<UseQueryOptions, 'mutationFn' | "mutationKey">
 * @returns UseMutationResult
 *
 * @example const mutateRes = usePost<ResponseType, RequestData>({ queryKey: 'key', endPoint: 'endpoint', config: {} });
 */
export function useMutate<R, D>(
  props: MutateRequestOptions<R, D>
): UseMutationResult<R, Error, unknown, QueryKey> {
  const {
    queryKey,
    requestType, 
    endPoint,
    config = {},
    data: requestData,
  } = props;

  return useMutation(
    queryKey,
    () => axiosCall<R, D>(requestType, endPoint, requestData),
    config
  );
}

function axiosCall<R, D>(type: RequestType, endPoint: string, data: D) {
  switch (type) {
    case RequestType.POST:
      return APIClient.getInstance().post<R, D>(endPoint, data);

    case RequestType.PUT:
      return APIClient.getInstance().put<R, D>(endPoint, data);

    case RequestType.PATCH:
      return APIClient.getInstance().patch<R, D>(endPoint, data);

    case RequestType.DELETE:
      return APIClient.getInstance().delete<R>(endPoint)
  }
}