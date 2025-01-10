import { Project } from '@/types/projects';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import ProjectTableListing from './ProjectTableListing';

jest.mock('../EditProject/EditProject', () => () => <div>Edit Project</div>);
jest.mock('../FavoriteProject/FavoriteProject', () => () => (
  <div>Favorite Project</div>
));

describe('ProjectTableListing', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      projectName: 'Project Alpha',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      projectManager: 'John Doe',
      isFavorite: false,
      projectDescription: 'Project Alpha description',
    },
    {
      id: '2',
      projectName: 'Project Beta',
      startDate: '2023-02-01',
      endDate: '2023-11-30',
      projectManager: 'Jane Doe',
      isFavorite: true,
      projectDescription: 'Project Beta description',
    },
  ];

  test('renders without crashing', () => {
    render(
      <ProjectTableListing projects={mockProjects} isProjectLoading={false} />
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('displays loading spinner when isProjectLoading is true', () => {
    render(<ProjectTableListing projects={[]} isProjectLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    render(
      <ProjectTableListing projects={mockProjects} isProjectLoading={false} />
    );
    const headers = [
      'Project ID',
      'Project Name',
      'Start Date',
      'End Date',
      'Project Manager',
      'Actions',
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders project rows correctly', () => {
    render(
      <ProjectTableListing projects={mockProjects} isProjectLoading={false} />
    );
    const rows = screen.getAllByRole('row');
    // Exclude the header row
    expect(rows.length - 1).toBe(mockProjects.length);
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
  });

  test("renders 'Actions' column with EditProject and FavoriteProject components", () => {
    render(
      <ProjectTableListing projects={mockProjects} isProjectLoading={false} />
    );
    expect(screen.getAllByText('Edit Project').length).toBe(
      mockProjects.length
    );
    expect(screen.getAllByText('Favorite Project').length).toBe(
      mockProjects.length
    );
  });

  test('handles empty project list gracefully', () => {
    render(<ProjectTableListing projects={[]} isProjectLoading={false} />);
    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBe(1); // Only the header row should be rendered
  });
});
