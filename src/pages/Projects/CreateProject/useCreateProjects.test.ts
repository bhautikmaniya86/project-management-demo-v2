import { useToast } from '@/context/ToastContext';
import { useCreateProject as useCreateProjectApi } from '@/services/projects';
import { Project } from '@/types/projects';
import { formatErrorMessage } from '@/utils/helpers';
import { act, renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import useCreateProject from './useCreateProject';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@/context/ToastContext', () => ({
  useToast: jest.fn(),
}));

jest.mock('@/services/projects', () => ({
  useCreateProject: jest.fn(),
}));

jest.mock('@/utils/helpers', () => ({
  formatErrorMessage: jest.fn(),
}));

describe('useCreateProject', () => {
  const mockNavigate = jest.fn();
  const mockShowToast = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useCreateProjectApi as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('should call mutate with form data when submitHandler is called', async () => {
    const { result } = renderHook(() => useCreateProject());
    const formData: Partial<Project> = {
      projectName: 'Test Project',
      projectDescription: 'A test project',
    };

    await act(async () => {
      result.current.submitHandler(formData);
    });

    expect(mockMutate).toHaveBeenCalledWith(formData);
  });

  it('should return isCreatingProject status', () => {
    (useCreateProjectApi as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    const { result } = renderHook(() => useCreateProject());

    expect(result.current.isCreatingProject).toBe(true);
  });
});
