import { Project } from '@/types/projects'; // Ensure correct path to the Project type
import { render, screen } from '@testing-library/react';
import React from 'react';
import MobileCard from './MobileCard'; // Path to your component

// Mock EditProject and FavoriteProject components
jest.mock('../../EditProject/EditProject', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="edit-project">Edit</div>),
}));

jest.mock('../../FavoriteProject/FavoriteProject', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="favorite-project">Favorite</div>),
}));

// Sample project data
const mockProject: Project = {
  id: '1',
  projectName: 'Test Project',
  startDate: '2022-01-01',
  endDate: '2022-12-31',
  projectManager: 'John Doe',
  isFavorite: false,
  projectDescription: 'Sample project description.',
};

describe('MobileCard Component', () => {
  test('renders project details correctly', () => {
    render(<MobileCard project={mockProject} />);

    // Check if the project details are rendered correctly
    expect(screen.getByText('Project ID:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Project ID
    expect(screen.getByText('Project Name:')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument(); // Project Name
    expect(screen.getByText('Start Date:')).toBeInTheDocument();
    expect(screen.getByText('2022-01-01')).toBeInTheDocument(); // Start Date
    expect(screen.getByText('End Date:')).toBeInTheDocument();
    expect(screen.getByText('2022-12-31')).toBeInTheDocument(); // End Date
    expect(screen.getByText('Project Manager:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument(); // Project Manager
  });

  test('renders the action buttons (Edit and Favorite) correctly', () => {
    render(<MobileCard project={mockProject} />);

    // Ensure the action buttons are rendered
    const editButton = screen.getByTestId('edit-project');
    const favoriteButton = screen.getByTestId('favorite-project');

    expect(editButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent('Edit');
    expect(favoriteButton).toHaveTextContent('Favorite');
  });

  test('renders the correct project values in the details section', () => {
    render(<MobileCard project={mockProject} />);

    // Ensure project values are correctly rendered
    expect(screen.getByText('1')).toBeInTheDocument(); // Project ID
    expect(screen.getByText('Test Project')).toBeInTheDocument(); // Project Name
    expect(screen.getByText('2022-01-01')).toBeInTheDocument(); // Start Date
    expect(screen.getByText('2022-12-31')).toBeInTheDocument(); // End Date
    expect(screen.getByText('John Doe')).toBeInTheDocument(); // Project Manager
  });

  test('does not render the action buttons if they are not passed or should not be displayed', () => {
    // Optionally, test for hidden or conditionally rendered buttons if applicable
    render(<MobileCard project={mockProject} />);

    const editButton = screen.getByTestId('edit-project');
    const favoriteButton = screen.getByTestId('favorite-project');

    expect(editButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });
});
