import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FavoriteProjectList from './FavoriteProjectList';
import useFavoriteProjectList from './useFavoriteProjectList';

// Mock the custom hook
jest.mock('./useFavoriteProjectList');

// Mock the MUI CircularProgress component
jest.mock('@mui/material', () => ({
  CircularProgress: () => <div data-testid="circular-progress" />,
}));

const mockHandleCloseMobileMenu = jest.fn();

describe('FavoriteProjectList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    (useFavoriteProjectList as jest.Mock).mockReturnValue({
      isFavoriteProjectsLoading: false,
      favoriteProjects: [],
    });

    render(
      <BrowserRouter>
        <FavoriteProjectList
          handleCloseMobileMenu={mockHandleCloseMobileMenu}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Favorite Projects')).toBeInTheDocument();
  });

  it('displays loading indicator when projects are loading', () => {
    (useFavoriteProjectList as jest.Mock).mockReturnValue({
      isFavoriteProjectsLoading: true,
      favoriteProjects: [],
    });

    render(
      <BrowserRouter>
        <FavoriteProjectList
          handleCloseMobileMenu={mockHandleCloseMobileMenu}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  it('displays "No Favorites Projects Found" when there are no projects', () => {
    (useFavoriteProjectList as jest.Mock).mockReturnValue({
      isFavoriteProjectsLoading: false,
      favoriteProjects: [],
    });

    render(
      <BrowserRouter>
        <FavoriteProjectList
          handleCloseMobileMenu={mockHandleCloseMobileMenu}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('No Favorites Projects Found')).toBeInTheDocument();
  });

  it('renders project list when there are favorite projects', () => {
    const mockProjects = [
      { id: '1', projectName: 'Project 1' },
      { id: '2', projectName: 'Project 2' },
    ];

    (useFavoriteProjectList as jest.Mock).mockReturnValue({
      isFavoriteProjectsLoading: false,
      favoriteProjects: mockProjects,
    });

    render(
      <BrowserRouter>
        <FavoriteProjectList
          handleCloseMobileMenu={mockHandleCloseMobileMenu}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });
});
