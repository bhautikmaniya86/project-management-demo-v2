import { Project } from '@/types/projects';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { patchCall } from '../axiosInstance';
import useQueryHandlers from '../useQueryHandlers';
import { mutationEndpoints } from './endpoints';

type ProjectResponse = AxiosResponse<Project>;
type PartialAccountType = Partial<Project>;

/**
 * Edit a project
 */
export const useUpdateProject = ({
  projectId,
  mutationParams,
}: {
  projectId: string;
  mutationParams?: UseMutationOptions<
    ProjectResponse,
    AxiosError<Error>,
    PartialAccountType
  >;
}) => {
  const { mutationKey, url, invalidateKeys } =
    mutationEndpoints.updateProject(projectId);

  const { onSuccess } = useQueryHandlers({
    invalidateKeys,
    mutationParams,
  });

  return useMutation<ProjectResponse, AxiosError<Error>, PartialAccountType>({
    mutationKey,
    mutationFn: (data) => patchCall(url, data),
    ...mutationParams,
    onSuccess,
  });
};
