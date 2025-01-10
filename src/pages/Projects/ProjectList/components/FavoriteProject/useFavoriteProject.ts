import { useToast } from '@/context/ToastContext';
import { useUpdateProject } from '@/services/projects';
import { queryEndpoints } from '@/services/projects/endpoints';
import { Project } from '@/types/projects';
import { useQueryClient } from '@tanstack/react-query';

type UseFavoriteProjectType = {
  project: Project;
};

const useFavoriteProject = ({ project }: UseFavoriteProjectType) => {
  const queryClient = useQueryClient();

  const { showToast } = useToast();

  const projectId = project?.id;
  const { mutate, isPending: isSaving } = useUpdateProject({
    projectId: projectId,
    mutationParams: {
      onMutate: async (newProject) => {
        // Cancel any ongoing queries related to projects and favorites
        const { favoriteProjects, projects } = queryEndpoints;
        const favoriteProjectQueryKeys = favoriteProjects().queryKey;

        const projectQueryKeys = projects().queryKey;

        await queryClient.cancelQueries({
          queryKey: [
            ...favoriteProjectQueryKeys,
            ...projectQueryKeys,
            projectId,
          ],
          exact: true,
        });
        await queryClient.cancelQueries();
        // Store the previous state for potential rollback
        const previousProjects = queryClient.getQueryData<{ data: Project[] }>(
          projectQueryKeys
        );

        const previousDetailProject = queryClient.getQueryData<{
          data: Project[];
        }>([...projectQueryKeys, projectId]);

        const previousFavoriteProjects = queryClient.getQueryData<{
          data: Project[];
        }>(favoriteProjectQueryKeys);

        //update the project details cache

        queryClient.setQueryData(
          [...projectQueryKeys, projectId],
          (old: { data: Project } | undefined) => {
            if (!old) return old;
            return {
              ...old,
              data: { ...old.data, isFavorite: newProject.isFavorite },
            };
          }
        );

        // Update the 'projects' cache
        queryClient.setQueryData(
          projectQueryKeys,
          (old: { data: Project[] } | undefined) => {
            if (!old) return old;

            const updatedProjects = old.data.map((proj) =>
              proj.id === projectId
                ? { ...proj, isFavorite: newProject.isFavorite }
                : proj
            );

            return { ...old, data: updatedProjects };
          }
        );

        // Update the 'favorite-projects' cache
        if (newProject.isFavorite) {
          // Add the project to the favorites list
          queryClient.setQueryData(
            favoriteProjectQueryKeys,
            (old: { data: Project[] } | undefined) => {
              const updatedFavorites = [...(old?.data || []), project].sort(
                (a, b) => a.id - b.id
              );
              return { ...old, data: updatedFavorites };
            }
          );
        } else {
          // Remove the project from the favorites list
          queryClient.setQueryData(
            favoriteProjectQueryKeys,
            (old: { data: Project[] } | undefined) => {
              if (!old) return { data: [] };

              const filteredFavorites = old.data.filter(
                (proj) => proj.id !== projectId
              );
              return { ...old, data: filteredFavorites };
            }
          );
        }

        // Display a success toast message
        showToast(
          newProject.isFavorite
            ? 'Project marked as favorite'
            : 'Project removed from favorite',
          'success'
        );

        // Return the previous state for potential rollback
        return {
          previousProjects,
          previousFavoriteProjects,
          previousDetailProject,
        };
      },
      onError: (err, _, context) => {
        const { favoriteProjects, projects } = queryEndpoints;
        const favoriteProjectQueryKeys = favoriteProjects().queryKey;

        const projectQueryKeys = projects().queryKey;
        queryClient.setQueryData(projectQueryKeys, context.previousProjects);
        queryClient.setQueryData(
          [...projectQueryKeys, projectId],
          context.previousDetailProject
        );

        queryClient.setQueryData(
          favoriteProjectQueryKeys,
          context.previousFavoriteProjects
        );

        showToast('An error occurred. Please try again later.', 'error');
      },
    },
  });

  const handleToggleFavorite = async () => {
    mutate({ isFavorite: !project.isFavorite });
  };

  return { handleToggleFavorite, isSaving };
};

export default useFavoriteProject;
