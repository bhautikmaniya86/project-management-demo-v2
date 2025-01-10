import { Project } from '@/types/projects';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { postCall } from '../axiosInstance';
import useQueryHandlers from '../useQueryHandlers';
import { mutationEndpoints } from './endpoints';

type ProjectResponse = AxiosResponse<Project>;
type PartialAccountType = Partial<Project>;

/**
 * Create a project
 */
export const useCreateProject = ({
  mutationParams,
}: {
  mutationParams?: UseMutationOptions<
    ProjectResponse,
    AxiosError<Error>,
    PartialAccountType
  >;
}) => {
  const { mutationKey, url, invalidateKeys } =
    mutationEndpoints.createProject();

  const { onSuccess } = useQueryHandlers({
    invalidateKeys,
    mutationParams,
  });

  return useMutation<ProjectResponse, AxiosError<Error>, PartialAccountType>({
    mutationKey,
    mutationFn: (data) => postCall(url, data),
    ...mutationParams,
    onSuccess,
  });
};
