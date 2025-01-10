export const queryEndpoints = {
  projects: () => {
    return {
      queryKey: ['projects'],
      url: `/projects`,
    };
  },
  favoriteProjects: () => {
    return {
      queryKey: ['favorite-projects'],
      url: `/projects?isFavorite=true`,
    };
  },
  project: (projectId: string) => {
    return {
      queryKey: ['projects', projectId],
      url: `/projects/${projectId}`,
    };
  },
};

export const mutationEndpoints = {
  updateProject: (projectId: string) => ({
    mutationKey: ['project', projectId],
    url: `/projects/${projectId}`,
    invalidateKeys: [
      queryEndpoints.projects().queryKey,
      queryEndpoints.favoriteProjects().queryKey,
    ],
  }),
  createProject: () => ({
    mutationKey: ['project'],
    url: '/projects',
    invalidateKeys: [
      queryEndpoints.projects().queryKey,
      queryEndpoints.favoriteProjects().queryKey,
    ],
  }),
};
