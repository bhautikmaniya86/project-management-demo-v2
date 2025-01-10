import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateProject from './CreateProject';
import useCreateProject from './useCreateProject';

// Mock the useCreateProject hook
jest.mock('./useCreateProject');

// Mock the ProjectForm component
jest.mock('../components', () => ({
  ProjectForm: ({ submitHandler, isSavingProject }: { submitHandler: () => void, isSavingProject: boolean }) => (
    <form data-testid="project-form">
      <button type="submit" disabled={isSavingProject}>Submit</button>
    </form>
  ),
}));

describe('CreateProject', () => {
  const mockSubmitHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateProject as jest.Mock).mockReturnValue({
      submitHandler: mockSubmitHandler,
      isCreatingProject: false,
    });
  });

  it('renders the component with correct title', () => {
    render(<CreateProject />, { wrapper: BrowserRouter });
    expect(screen.getByText('Create New Project')).toBeInTheDocument();
  });

  it('renders the back button with correct link', () => {
    render(<CreateProject />, { wrapper: BrowserRouter });
    const backButton = screen.getByRole('link');
    expect(backButton).toHaveAttribute('href', '/projects');
  });

  it('renders the ProjectForm component', () => {
    render(<CreateProject />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('project-form')).toBeInTheDocument();
  });

  it('passes correct props to ProjectForm', () => {
    render(<CreateProject />, { wrapper: BrowserRouter });
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).not.toBeDisabled();
  });

  it('disables submit button when project is being created', () => {
    (useCreateProject as jest.Mock).mockReturnValue({
      submitHandler: mockSubmitHandler,
      isCreatingProject: true,
    });
    render(<CreateProject />, { wrapper: BrowserRouter });
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('applies correct CSS classes', () => {
    render(<CreateProject />, { wrapper: BrowserRouter });
    const mainDiv = screen.getByTestId('create-project-container');
    expect(mainDiv).toHaveClass('w-full md:p-8 p-4 h-full pb-24 overflow-y-auto bg-purple-200');
  });

  it('renders ArrowLeftIcon in the back button', () => {
    render(<CreateProject />, { wrapper: BrowserRouter });
    const backButton = screen.getByRole('link');
    expect(backButton.querySelector('svg')).toBeInTheDocument();
  });
});

