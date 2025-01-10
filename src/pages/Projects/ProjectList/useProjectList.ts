import { useGetProjects } from '@/services/projects';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const useProjectList = () => {
  const navigate = useNavigate();

  const { data, isLoading: isProjectLoading } = useGetProjects();

  const projects = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  return { projects, isProjectLoading, handleCreateProject };
};

export default useProjectList;
