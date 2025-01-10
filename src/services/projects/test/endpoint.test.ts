import { mutationEndpoints, queryEndpoints } from '../endpoints';

describe('queryEndpoints', () => {
  describe('projects', () => {
    it('should return the correct query key and URL', () => {
      const result = queryEndpoints.projects();
      expect(result).toEqual({
        queryKey: ['projects'],
        url: '/projects',
      });
    });
  });

  describe('favoriteProjects', () => {
    it('should return the correct query key and URL', () => {
      const result = queryEndpoints.favoriteProjects();
      expect(result).toEqual({
        queryKey: ['favorite-projects'],
        url: '/projects?isFavorite=true',
      });
    });
  });

  describe('project', () => {
    it('should return the correct query key and URL with the provided project ID', () => {
      const projectId = '123';
      const result = queryEndpoints.project(projectId);
      expect(result).toEqual({
        queryKey: ['projects', projectId],
        url: `/projects/${projectId}`,
      });
    });
  });
});

describe('mutationEndpoints', () => {
  describe('updateProject', () => {
    it('should return the correct mutation key, URL, and invalidate keys', () => {
      const projectId = '456';
      const result = mutationEndpoints.updateProject(projectId);
      expect(result).toEqual({
        mutationKey: ['project', projectId],
        url: `/projects/${projectId}`,
        invalidateKeys: [['projects'], ['favorite-projects']],
      });
    });
  });

  describe('createProject', () => {
    it('should return the correct mutation key, URL, and invalidate keys', () => {
      const result = mutationEndpoints.createProject();
      expect(result).toEqual({
        mutationKey: ['project'],
        url: '/projects',
        invalidateKeys: [['projects'], ['favorite-projects']],
      });
    });
  });
});
