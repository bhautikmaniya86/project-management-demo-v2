import { render, screen } from '@testing-library/react';
import React from 'react';
import ProjectCardListing from './ProjectCardListing'; // Your component

// Mock the MobileCard component
jest.mock('./components/MobileCard', () => {
  return ({ project }) => (
    <div data-testid="mobile-card">{project.projectName}</div>
  );
});

describe('ProjectCardListing Component', () => {
  test('shows CircularProgress spinner when isProjectLoading is true', () => {
    render(<ProjectCardListing projects={[]} isProjectLoading={true} />);

    // Ensure the CircularProgress component is rendered
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  test('displays project cards when isProjectLoading is false', () => {
    const mockProjects = [
      {
        id: '1',
        projectName: 'Project A',
        startDate: '2022-01-01',
        endDate: '2022-12-31',
        projectManager: 'Alice',
        isFavorite: true,
        projectDescription: 'Description A',
      },
      {
        id: '2',
        projectName: 'Project B',
        startDate: '2022-02-01',
        endDate: '2022-11-30',
        projectManager: 'Bob',
        isFavorite: true,
        projectDescription: 'Description B',
      },
    ];

    render(
      <ProjectCardListing projects={mockProjects} isProjectLoading={false} />
    );

    // Ensure both project cards are rendered
    const projectCards = screen.getAllByTestId('mobile-card');
    expect(projectCards).toHaveLength(mockProjects.length);
    expect(projectCards[0]).toHaveTextContent('Project A');
    expect(projectCards[1]).toHaveTextContent('Project B');
  });

  test('does not show CircularProgress when isProjectLoading is false', () => {
    render(<ProjectCardListing projects={[]} isProjectLoading={false} />);

    // Ensure CircularProgress is not present
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).toBeNull();
  });
});
