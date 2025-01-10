import { useToast } from '@/context/ToastContext';
import { Project } from '@/types/projects';
import { formatErrorMessage } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { useCreateProject as useCreateProjectApi } from '@/services/projects';

const useCreateProject = () => {
  const navigate = useNavigate();

  const { showToast } = useToast();

  const { mutate, isPending: isCreatingProject } = useCreateProjectApi({
    mutationParams: {
      onSuccess: () => {
        showToast('Project created successfully', 'success');
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

  return { submitHandler, isCreatingProject };
};

export default useCreateProject;
