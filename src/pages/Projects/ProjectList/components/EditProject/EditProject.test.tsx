import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import EditProject from './EditProject';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('EditProject', () => {
  const mockProject = {
    id: '1',
    projectName: 'Test Project',
    projectDescription: 'Test Description',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    projectManager: 'John Doe',
  };

  it('renders the edit button', () => {
    render(
      <MemoryRouter>
        <EditProject project={mockProject} />
      </MemoryRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent('Edit');
    expect(editButton).toHaveClass('!rounded-lg');
  });

  it('navigates to the edit page when clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <EditProject project={mockProject} />
      </MemoryRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/projects/1/edit');
  });
});
