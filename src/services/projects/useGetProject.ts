import { Project } from '@/types/projects';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getCall } from '../axiosInstance';
import { queryEndpoints } from './endpoints';

type ProjectResponse = AxiosResponse<Project>;

/**
 * Fetch project with ID
 */
export const useGetProject = ({
  projectId,
  queryParams,
}: {
  projectId: string;
  queryParams?: UseQueryOptions<ProjectResponse, Error, ProjectResponse>;
}) => {
  const { queryKey, url } = queryEndpoints.project(projectId);

  return useQuery<ProjectResponse, Error>({
    queryKey,
    queryFn: () => getCall(url),
    ...queryParams,
  });
};
