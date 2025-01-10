import { useToast } from '@/context/ToastContext';
import { useGetProject, useUpdateProject } from '@/services/projects';
import { Project } from '@/types/projects';
import { act, renderHook } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import useEditProject from '../useEditProject';

// Mock the dependencies
jest.mock('@/context/ToastContext');
jest.mock('@/services/projects');
jest.mock('react-router-dom');

describe('useEditProject', () => {
  const mockShowToast = jest.fn();
  const mockNavigate = jest.fn();
  const mockProjectId = '123';
  const mockMutate = jest.fn();

  const mockProject: Project = {
    id: '123',
    projectName: 'Test Project',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    projectManager: 'John Doe',
    projectDescription: 'This is a test project',
    isFavorite: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ projectId: mockProjectId });
    (useUpdateProject as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('should fetch project data on mount', async () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { data: mockProject },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useEditProject());

    await act(async () => {
      // Wait for any effects to complete
    });

    expect(result.current.projectData).toEqual(mockProject);
    expect(result.current.isFetchingData).toBe(false);
  });

  it('should navigate to projects page if there is an error fetching data', async () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    renderHook(() => useEditProject());

    await act(async () => {
      // Wait for any effects to complete
    });

    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should call mutate with form data on submitHandler', async () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { data: mockProject },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useEditProject());

    const updatedProject: Partial<Project> = {
      projectName: 'Updated Project',
      projectDescription: 'This is an updated project',
    };

    await act(async () => {
      result.current.submitHandler(updatedProject);
    });

    expect(mockMutate).toHaveBeenCalledWith(updatedProject);
  });

  it('should show success toast and navigate on successful update', async () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { data: mockProject },
      isLoading: false,
      error: null,
    });

    let onSuccessCallback: () => void;
    (useUpdateProject as jest.Mock).mockImplementation(({ mutationParams }) => {
      onSuccessCallback = mutationParams.onSuccess;
      return {
        mutate: (data: any) => {
          onSuccessCallback();
        },
        isPending: false,
      };
    });

    renderHook(() => useEditProject());

    await act(async () => {
      onSuccessCallback();
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      'Project updated successfully',
      'success'
    );
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should show error toast on update failure', async () => {
    (useGetProject as jest.Mock).mockReturnValue({
      data: { data: mockProject },
      isLoading: false,
      error: null,
    });

    const mockError = new Error('Update failed');
    let onErrorCallback: (error: Error) => void;
    (useUpdateProject as jest.Mock).mockImplementation(({ mutationParams }) => {
      onErrorCallback = mutationParams.onError;
      return {
        mutate: (data: any) => {
          onErrorCallback(mockError);
        },
        isPending: false,
      };
    });

    renderHook(() => useEditProject());

    await act(async () => {
      onErrorCallback(mockError);
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      'An error occurred. Please try again later.',
      'error'
    );
  });
});
