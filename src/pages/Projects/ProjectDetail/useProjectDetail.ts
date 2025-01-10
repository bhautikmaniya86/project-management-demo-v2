import { useGetProject } from '@/services/projects';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type ToastConfigType = {
  isOpen: boolean;
  message: string;
  variant: 'success' | 'error';
};

const useProjectDetail = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const {
    data: projectData,
    isLoading: isProjectLoading,
    error,
  } = useGetProject({
    projectId: projectId!,
    queryParams: {
      enabled: !!projectId,
    },
  });

  const handleBackNavigate = () => {
    navigate('/projects');
  };

  const handleEditButton = () => {
    navigate(`/projects/${projectId}/edit`);
  };

  useEffect(() => {
    if (!projectData && !isProjectLoading && error) {
      navigate('/projects');
    }
  }, [error, isProjectLoading, projectData]);

  return {
    projectData,
    isProjectLoading,
    handleBackNavigate,
    handleEditButton,
  };
};

export default useProjectDetail;
