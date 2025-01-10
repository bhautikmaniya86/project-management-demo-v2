import { useToast } from '@/context/ToastContext';
import { useGetProject, useUpdateProject } from '@/services/projects';
import { Project } from '@/types/projects';
import { formatErrorMessage } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const useEditProject = () => {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const { showToast } = useToast();

  const {
    data,
    isLoading: isFetchingData,
    error,
  } = useGetProject({
    projectId: projectId!,
    queryParams: {
      enabled: !!projectId,
    },
  });

  useEffect(() => {
    if (!data && !isFetchingData && error) {
      navigate('/projects');
    }
  }, [error, isFetchingData, data]);

  const projectData = useMemo(() => (data?.data ? data.data : null), [data]);

  const { mutate, isPending: isSavingProject } = useUpdateProject({
    projectId: projectData?.id!,
    mutationParams: {
      onSuccess: () => {
        showToast('Project updated successfully', 'success');
        navigate('/projects');
      },
      onError: (error: AxiosError<Error>) => {
        showToast(formatErrorMessage(error), 'error');
      },
    },
  });

  const submitHandler = (formData: Partial<Project>) => {
    mutate(formData);
  };

  return {
    projectData,
    isFetchingData,
    submitHandler,
    isSavingProject,
  };
};

export default useEditProject;
