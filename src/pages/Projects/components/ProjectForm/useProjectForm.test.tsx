import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useForm } from 'react-hook-form';
import useProjectForm from './useProjectForm';

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('useProjectForm', () => {
  const mockSubmitHandler = jest.fn();
  const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn((fn) => fn),
      control: {},
      reset: jest.fn(),
      watch: jest.fn(),
      formState: { errors: {}, isDirty: false },
    } as any);
  });

  it('should initialize with default values', () => {
    renderHook(() => useProjectForm({ submitHandler: mockSubmitHandler }));

    expect(mockUseForm).toHaveBeenCalledWith({
      defaultValues: {
        projectName: '',
        startDate: '',
        endDate: '',
        projectManager: '',
        projectDescription: '',
        isFavorite: false,
      },
    });
  });

  it('should reset form with project data when project is provided', () => {
    const mockProject = {
      id: '1',
      projectName: 'Test Project',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      projectManager: 'John Doe',
      projectDescription: 'Test Description',
      isFavorite: true,
    };

    const { result } = renderHook(() =>
      useProjectForm({ project: mockProject, submitHandler: mockSubmitHandler })
    );

    expect(result.current.form.reset).toHaveBeenCalledWith(mockProject);
  });

  it('should call submitHandler with trimmed project name on form submission', () => {
    const { result } = renderHook(() =>
      useProjectForm({ submitHandler: mockSubmitHandler })
    );

    act(() => {
      result.current.onSubmit({
        projectName: '  Test Project  ',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        projectManager: 'John Doe',
        projectDescription: 'Test Description',
        isFavorite: false,
      });
    });

    expect(mockSubmitHandler).toHaveBeenCalledWith({
      projectName: 'Test Project',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      projectManager: 'John Doe',
      projectDescription: 'Test Description',
      isFavorite: false,
    });
  });

  it('should return form methods and state', () => {
    const { result } = renderHook(() =>
      useProjectForm({ submitHandler: mockSubmitHandler })
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        handleSubmit: expect.any(Function),
        register: expect.any(Function),
        control: expect.any(Object),
        errors: expect.any(Object),
        onSubmit: expect.any(Function),
        form: expect.any(Object),
        watch: expect.any(Function),
      })
    );
  });
});
