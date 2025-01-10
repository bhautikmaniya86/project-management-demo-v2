import { useGetFavoriteProjects } from '@/services/projects';
import { useMemo } from 'react';

const useFavoriteProjectList = () => {
  const { data, isLoading: isFavoriteProjectsLoading } =
    useGetFavoriteProjects();

  console.log('data', data?.data);

  const favoriteProjects = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  return { favoriteProjects, isFavoriteProjectsLoading };
};

export default useFavoriteProjectList;
