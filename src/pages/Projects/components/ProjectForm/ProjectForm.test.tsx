import { Project } from '@/types/projects';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ProjectForm from './ProjectForm';
import useProjectForm from './useProjectForm';

// Mock the useProjectForm hook
jest.mock('./useProjectForm');

// Mock the FormDatePickerField component
jest.mock('@/components', () => ({
  FormDatePickerField: ({ label, name }: { label: string; name: string }) => (
    <input type="date" data-testid={`date-picker-${name}`} aria-label={label} />
  ),
}));

describe('ProjectForm', () => {
  const mockSubmitHandler = jest.fn();
  const mockUseProjectForm = useProjectForm as jest.MockedFunction<
    typeof useProjectForm
  >;

  beforeEach(() => {
    mockUseProjectForm.mockReturnValue({
      errors: {},
      handleSubmit: jest.fn((cb) => cb),
      onSubmit: jest.fn(),
      register: jest.fn(),
      form: {
        control: {},
      },
      watch: jest.fn(),
    });
  });

  it('renders correctly for creating a new project', () => {
    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    expect(screen.getByLabelText('Project Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Manager')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('renders correctly for updating an existing project', () => {
    const mockProject: Project = {
      id: '123',
      projectName: 'Test Project',
      projectDescription: 'Test Description',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      projectManager: 'John Doe',
    };

    render(
      <ProjectForm
        project={mockProject}
        submitHandler={mockSubmitHandler}
        isSavingProject={false}
      />
    );

    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('displays loading state when saving', () => {
    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={true} />
    );

    expect(screen.getByRole('button', { name: '' })).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls submitHandler on form submission', async () => {
    const mockOnSubmit = jest.fn();
    mockUseProjectForm.mockReturnValue({
      ...mockUseProjectForm(),
      onSubmit: mockOnSubmit,
    });

    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('displays error messages for invalid inputs', async () => {
    mockUseProjectForm.mockReturnValue({
      ...mockUseProjectForm(),
      errors: {
        projectName: { message: 'Project name is required' },
        projectManager: { message: 'Project manager is required' },
      },
    });

    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    expect(screen.getByText('Project name is required')).toBeInTheDocument();
    expect(screen.getByText('Project manager is required')).toBeInTheDocument();
  });

  it('disables submit button when form is saving', () => {
    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={true} />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('validates project name length', async () => {
    mockUseProjectForm.mockReturnValue({
      ...mockUseProjectForm(),
      errors: {
        projectName: { message: "Project name cann't exceed 20 characters." },
      },
    });

    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    expect(
      screen.getByText("Project name cann't exceed 20 characters.")
    ).toBeInTheDocument();
  });

  it('validates project name for spaces', async () => {
    mockUseProjectForm.mockReturnValue({
      ...mockUseProjectForm(),
      errors: {
        projectName: { message: 'Spaces are not allowed' },
      },
    });

    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    expect(screen.getByText('Spaces are not allowed')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    const mockHandleSubmit = jest.fn((cb) => cb);
    const mockOnSubmit = jest.fn();

    mockUseProjectForm.mockReturnValue({
      ...mockUseProjectForm(),
      handleSubmit: mockHandleSubmit,
      onSubmit: mockOnSubmit,
    });

    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('renders project id field for existing projects', () => {
    const mockProject: Project = {
      id: '123',
      projectName: 'Test Project',
      projectDescription: 'Test Description',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      projectManager: 'John Doe',
    };

    render(
      <ProjectForm
        project={mockProject}
        submitHandler={mockSubmitHandler}
        isSavingProject={false}
      />
    );

    const projectIdField = screen.getByLabelText('Project Id');
    expect(projectIdField).toBeInTheDocument();
    expect(projectIdField).toHaveValue('123');
    expect(projectIdField).toBeDisabled();
  });

  it('does not render project id field for new projects', () => {
    render(
      <ProjectForm submitHandler={mockSubmitHandler} isSavingProject={false} />
    );

    expect(screen.queryByLabelText('Project Id')).not.toBeInTheDocument();
  });
});
