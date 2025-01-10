import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';
import useProjectDetail from './useProjectDetail';

// Mock the custom hook
jest.mock('./useProjectDetail');

// Mock the FavoriteProject component
jest.mock('../ProjectList/components/FavoriteProject/FavoriteProject', () => {
  return function MockFavoriteProject() {
    return <div data-testid="favorite-project">Favorite Project</div>;
  };
});

const mockProjectData = {
  data: {
    id: '1',
    projectName: 'Test Project',
    projectDescription: 'Test Description',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    projectManager: 'John Doe',
  },
};

describe('ProjectDetail', () => {
  it('renders loading state', () => {
    (useProjectDetail as jest.Mock).mockReturnValue({
      isProjectLoading: true,
      projectData: null,
    });

    render(<ProjectDetail />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders project details when data is loaded', () => {
    (useProjectDetail as jest.Mock).mockReturnValue({
      isProjectLoading: false,
      projectData: mockProjectData,
      handleBackNavigate: jest.fn(),
      handleEditButton: jest.fn(),
    });

    render(
      <BrowserRouter>
        <ProjectDetail />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Project Details')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('2023-12-31')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders back and edit buttons', () => {
    (useProjectDetail as jest.Mock).mockReturnValue({
      isProjectLoading: false,
      projectData: mockProjectData,
      handleBackNavigate: jest.fn(),
      handleEditButton: jest.fn(),
    });

    render(
      <BrowserRouter>
        <ProjectDetail />
      </BrowserRouter>
    );

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
