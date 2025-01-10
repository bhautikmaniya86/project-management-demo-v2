import { UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

type useQueryHandlersProps<T> = {
  mutationParams?:
    | UseMutationOptions<AxiosResponse<T>, AxiosError<Error>, T>
    | undefined;
  invalidateKeys?: string[][];
};

const useQueryHandlers = <T>({
  mutationParams,
  invalidateKeys,
}: useQueryHandlersProps<T>) => {
  const queryClient = useQueryClient();
  const onSuccess = (
    response: AxiosResponse<T>,
    variables: Partial<T>,
    context: unknown
  ) => {
    if (mutationParams?.onSuccess) {
      mutationParams?.onSuccess(response, variables as T, context);
    }
    invalidateKeys?.forEach((key) =>
      queryClient.invalidateQueries({ queryKey: key })
    );
  };

  return { onSuccess };
};

export default useQueryHandlers;
