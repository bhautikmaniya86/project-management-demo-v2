import { useGetFavoriteProjects } from '@/services/projects';
import { renderHook } from '@testing-library/react';
import useFavoriteProjectList from './useFavoriteProjectList';

// Mock the useGetFavoriteProjects hook
jest.mock('@/services/projects', () => ({
  useGetFavoriteProjects: jest.fn(),
}));

describe('useFavoriteProjectList', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state', () => {
    (useGetFavoriteProjects as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useFavoriteProjectList());

    expect(result.current.isFavoriteProjectsLoading).toBe(true);
    expect(result.current.favoriteProjects).toEqual([]);
  });

  it('should return favorite projects when data is available', () => {
    const mockProjects = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
    ];

    (useGetFavoriteProjects as jest.Mock).mockReturnValue({
      data: { data: mockProjects },
      isLoading: false,
    });

    const { result } = renderHook(() => useFavoriteProjectList());

    expect(result.current.isFavoriteProjectsLoading).toBe(false);
    expect(result.current.favoriteProjects).toEqual(mockProjects);
  });

  it('should return an empty array when data is not an array', () => {
    (useGetFavoriteProjects as jest.Mock).mockReturnValue({
      data: { data: 'not an array' },
      isLoading: false,
    });

    const { result } = renderHook(() => useFavoriteProjectList());

    expect(result.current.isFavoriteProjectsLoading).toBe(false);
    expect(result.current.favoriteProjects).toEqual([]);
  });

  it('should return an empty array when data is undefined', () => {
    (useGetFavoriteProjects as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useFavoriteProjectList());

    expect(result.current.isFavoriteProjectsLoading).toBe(false);
    expect(result.current.favoriteProjects).toEqual([]);
  });

  it('should log data to console', () => {
    const mockProjects = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
    ];

    (useGetFavoriteProjects as jest.Mock).mockReturnValue({
      data: { data: mockProjects },
      isLoading: false,
    });

    const consoleSpy = jest.spyOn(console, 'log');
    renderHook(() => useFavoriteProjectList());

    expect(consoleSpy).toHaveBeenCalledWith('data', mockProjects);
    consoleSpy.mockRestore();
  });
});

