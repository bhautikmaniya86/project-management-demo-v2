import { useToast } from '@/context/ToastContext';
import { useUpdateProject } from '@/services/projects';
import { Project } from '@/types/projects';
import { useQueryClient } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useFavoriteProject from './useFavoriteProject';

jest.mock('@/context/ToastContext');
jest.mock('@/services/projects');
jest.mock('@tanstack/react-query');
jest.mock('@/services/projects/endpoints', () => ({
  queryEndpoints: {
    favoriteProjects: jest
      .fn()
      .mockReturnValue({ queryKey: ['favoriteProjects'] }),
    projects: jest.fn().mockReturnValue({ queryKey: ['projects'] }),
  },
}));

describe('useFavoriteProject Special Cases', () => {
  const mockShowToast = jest.fn();
  const mockMutate = jest.fn();
  const mockCancelQueries = jest.fn();
  const mockGetQueryData = jest.fn();
  const mockSetQueryData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useUpdateProject as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    (useQueryClient as jest.Mock).mockReturnValue({
      cancelQueries: mockCancelQueries,
      getQueryData: mockGetQueryData,
      setQueryData: mockSetQueryData,
    });
  });

  it('should update project details cache correctly', async () => {
    const mockProject: Project = {
      id: 1,
      isFavorite: false,
      name: 'Test Project',
    };
    renderHook(() => useFavoriteProject({ project: mockProject }));

    const onMutate = (useUpdateProject as jest.Mock).mock.calls[0][0]
      .mutationParams.onMutate;
    await onMutate({ isFavorite: true });

    expect(mockSetQueryData).toHaveBeenCalledWith(
      ['projects', 1],
      expect.any(Function)
    );

    const updateFunction = mockSetQueryData.mock.calls.find(
      (call) => call[0][0] === 'projects' && call[0][1] === 1
    )[1];
    const result = updateFunction({ data: mockProject });
    expect(result).toEqual({ data: { ...mockProject, isFavorite: true } });
  });

  describe('updating favorite projects cache', () => {
    it('should add project to favorites when marked as favorite', async () => {
      const mockProject: Project = {
        id: 1,
        isFavorite: false,
        name: 'Test Project',
      };
      const existingFavorites: Project[] = [
        { id: 2, isFavorite: true, name: 'Existing Favorite' },
      ];
      mockGetQueryData.mockReturnValue({ data: existingFavorites });

      renderHook(() => useFavoriteProject({ project: mockProject }));

      const onMutate = (useUpdateProject as jest.Mock).mock.calls[0][0]
        .mutationParams.onMutate;
      await onMutate({ isFavorite: true });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        ['favoriteProjects'],
        expect.any(Function)
      );

      const updateFunction = mockSetQueryData.mock.calls.find(
        (call) => call[0][0] === 'favoriteProjects'
      )[1];
      const result = updateFunction({ data: existingFavorites });
      expect(result).toEqual({
        data: [existingFavorites[0], mockProject].sort((a, b) => a.id - b.id),
      });
    });

    it('should remove project from favorites when unmarked as favorite', async () => {
      const mockProject: Project = {
        id: 1,
        isFavorite: true,
        name: 'Test Project',
      };
      const existingFavorites: Project[] = [
        mockProject,
        { id: 2, isFavorite: true, name: 'Existing Favorite' },
      ];
      mockGetQueryData.mockReturnValue({ data: existingFavorites });

      renderHook(() => useFavoriteProject({ project: mockProject }));

      const onMutate = (useUpdateProject as jest.Mock).mock.calls[0][0]
        .mutationParams.onMutate;
      await onMutate({ isFavorite: false });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        ['favoriteProjects'],
        expect.any(Function)
      );

      const updateFunction = mockSetQueryData.mock.calls.find(
        (call) => call[0][0] === 'favoriteProjects'
      )[1];
      const result = updateFunction({ data: existingFavorites });
      expect(result).toEqual({
        data: [existingFavorites[1]],
      });
    });

    it('should handle empty favorites list correctly', async () => {
      const mockProject: Project = {
        id: 1,
        isFavorite: false,
        name: 'Test Project',
      };
      mockGetQueryData.mockReturnValue(undefined);

      renderHook(() => useFavoriteProject({ project: mockProject }));

      const onMutate = (useUpdateProject as jest.Mock).mock.calls[0][0]
        .mutationParams.onMutate;
      await onMutate({ isFavorite: true });

      expect(mockSetQueryData).toHaveBeenCalledWith(
        ['favoriteProjects'],
        expect.any(Function)
      );

      const updateFunction = mockSetQueryData.mock.calls.find(
        (call) => call[0][0] === 'favoriteProjects'
      )[1];
      const result = updateFunction(undefined);
      expect(result).toEqual({
        data: [mockProject],
      });
    });
  });

  it('should update cache and show toast on successful mutation', async () => {
    const mockProject = { id: 1, isFavorite: false };
    renderHook(() => useFavoriteProject({ project: mockProject }));

    const onMutate = (useUpdateProject as jest.Mock).mock.calls[0][0]
      .mutationParams.onMutate;
    await onMutate({ isFavorite: true });

    expect(mockCancelQueries).toHaveBeenCalled();
    expect(mockSetQueryData).toHaveBeenCalledTimes(3);
    expect(mockShowToast).toHaveBeenCalledWith(
      'Project marked as favorite',
      'success'
    );
  });

  it('should handle errors and revert cache', async () => {
    const mockProject = { id: 1, isFavorite: true };
    renderHook(() => useFavoriteProject({ project: mockProject }));

    const onError = (useUpdateProject as jest.Mock).mock.calls[0][0]
      .mutationParams.onError;
    const mockContext = {
      previousProjects: { data: [mockProject] },
      previousFavoriteProjects: { data: [mockProject] },
      previousDetailProject: { data: mockProject },
    };

    onError(new Error('Test error'), null, mockContext);

    expect(mockSetQueryData).toHaveBeenCalledTimes(3);
    expect(mockShowToast).toHaveBeenCalledWith(
      'An error occurred. Please try again later.',
      'error'
    );
  });

  it('should return isSaving status', () => {
    (useUpdateProject as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    const mockProject = { id: 1, isFavorite: false };
    const { result } = renderHook(() =>
      useFavoriteProject({ project: mockProject })
    );

    expect(result.current.isSaving).toBe(true);
  });

  it('should display correct success toast message when toggling favorite', async () => {
    const mockProject: Project = {
      id: 1,
      isFavorite: false,
      name: 'Test Project',
    };

    renderHook(() => useFavoriteProject({ project: mockProject }));

    const onMutate = (useUpdateProject as jest.Mock).mock.calls[0][0]
      .mutationParams.onMutate;

    await onMutate({ isFavorite: true });
    expect(mockShowToast).toHaveBeenCalledWith(
      'Project marked as favorite',
      'success'
    );

    mockShowToast.mockClear();

    await onMutate({ isFavorite: false });
    expect(mockShowToast).toHaveBeenCalledWith(
      'Project removed from favorite',
      'success'
    );
  });

  it('should call mutate with toggled isFavorite value when handleToggleFavorite is called', async () => {
    const mockProject: Project = {
      id: 1,
      isFavorite: false,
      name: 'Test Project',
    };

    const { result } = renderHook(() =>
      useFavoriteProject({ project: mockProject })
    );

    await act(async () => {
      await result.current.handleToggleFavorite();
    });

    expect(mockMutate).toHaveBeenCalledWith({ isFavorite: true });

    mockMutate.mockClear();
    const updatedMockProject = { ...mockProject, isFavorite: true };
    const { result: updatedResult } = renderHook(() =>
      useFavoriteProject({ project: updatedMockProject })
    );

    await act(async () => {
      await updatedResult.current.handleToggleFavorite();
    });

    expect(mockMutate).toHaveBeenCalledWith({ isFavorite: false });
  });
});
