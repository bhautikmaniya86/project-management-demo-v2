import { useGetProject } from '@/services/projects';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProjectDetail from './useProjectDetail';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('@/services/projects', () => ({
  useGetProject: jest.fn(),
}));

describe('useProjectDetail', () => {
  const mockNavigate = jest.fn();
  const mockProjectId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ projectId: mockProjectId });
  });

  it('should fetch project data on mount', () => {
    const mockProjectData = { id: '123', name: 'Test Project' };
    (useGetProject as jest.Mock).mockReturnValue({
      data: mockProjectData,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useProjectDetail());

    expect(useGetProject).toHaveBeenCalledWith({
      projectId: mockProjectId,
      queryParams: { enabled: true },
    });
    expect(result.current.projectData).toEqual(mockProjectData);
    expect(result.current.isProjectLoading).toBe(false);
  });

  it('should navigate to projects page if there is an error fetching data', () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    renderHook(() => useProjectDetail());

    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should handle back navigation', () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { id: '123', name: 'Test Project' },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useProjectDetail());

    act(() => {
      result.current.handleBackNavigate();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should handle edit button click', () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { id: '123', name: 'Test Project' },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useProjectDetail());

    act(() => {
      result.current.handleEditButton();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/projects/123/edit');
  });

  it('should not navigate if project data is loading', () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderHook(() => useProjectDetail());

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not navigate if project data is available', () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { id: '123', name: 'Test Project' },
      isLoading: false,
      error: null,
    });

    renderHook(() => useProjectDetail());

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
