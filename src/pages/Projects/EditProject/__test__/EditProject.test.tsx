import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import EditProject from '../EditProject';
import useEditProject from '../useEditProject';

// Mock the dependencies
jest.mock('../useEditProject');
jest.mock('../../components', () => ({
  ProjectForm: () => <div data-testid="project-form">Project Form</div>,
}));

describe('EditProject', () => {
  const mockSubmitHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    (useEditProject as jest.Mock).mockReturnValue({
      projectData: null,
      isFetchingData: true,
      submitHandler: mockSubmitHandler,
      isSavingProject: false,
    });

    render(
      <MemoryRouter>
        <EditProject />
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render project form when data is loaded', () => {
    const mockProjectData = { id: '123', name: 'Test Project' };
    (useEditProject as jest.Mock).mockReturnValue({
      projectData: mockProjectData,
      isFetchingData: false,
      submitHandler: mockSubmitHandler,
      isSavingProject: false,
    });

    render(
      <MemoryRouter>
        <EditProject />
      </MemoryRouter>
    );

    expect(screen.getByText('Edit Details')).toBeInTheDocument();
    expect(screen.getByTestId('project-form')).toBeInTheDocument();
  });

  it('should render back button with correct link', () => {
    (useEditProject as jest.Mock).mockReturnValue({
      projectData: { id: '123', name: 'Test Project' },
      isFetchingData: false,
      submitHandler: mockSubmitHandler,
      isSavingProject: false,
    });

    render(
      <MemoryRouter>
        <EditProject />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('link');
    expect(backButton).toHaveAttribute('href', '/projects');
  });
});
