import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FavoriteProject from './FavoriteProject';
import useFavoriteProject from './useFavoriteProject';

// Mock the custom hook
jest.mock('./useFavoriteProject');

// Mock the icon components
jest.mock('@/assets/icons/FavoriteOutlineIcon', () => () => (
  <div data-testid="favorite-outline-icon" />
));
jest.mock('@/assets/icons/FavoriteSolidIcon', () => () => (
  <div data-testid="favorite-solid-icon" />
));

describe('FavoriteProject', () => {
  const mockProject = {
    id: '1',
    projectName: 'Test Project',
    isFavorite: false,
  };

  beforeEach(() => {
    (useFavoriteProject as jest.Mock).mockReturnValue({
      handleToggleFavorite: jest.fn(),
      isSaving: false,
    });
  });

  it('renders the favorite button', () => {
    render(<FavoriteProject project={mockProject} />);
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('displays FavoriteOutlineIcon when project is not favorite', () => {
    render(<FavoriteProject project={mockProject} />);
    expect(screen.getByTestId('favorite-outline-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('favorite-solid-icon')).not.toBeInTheDocument();
  });

  it('displays FavoriteSolidIcon when project is favorite', () => {
    const favoriteProject = { ...mockProject, isFavorite: true };
    render(<FavoriteProject project={favoriteProject} />);
    expect(screen.getByTestId('favorite-solid-icon')).toBeInTheDocument();
    expect(
      screen.queryByTestId('favorite-outline-icon')
    ).not.toBeInTheDocument();
  });

  it('calls handleToggleFavorite when clicked', () => {
    const mockHandleToggleFavorite = jest.fn();
    (useFavoriteProject as jest.Mock).mockReturnValue({
      handleToggleFavorite: mockHandleToggleFavorite,
      isSaving: false,
    });

    render(<FavoriteProject project={mockProject} />);
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favoriteButton);
    expect(mockHandleToggleFavorite).toHaveBeenCalled();
  });

  it('disables the button when isSaving is true', () => {
    (useFavoriteProject as jest.Mock).mockReturnValue({
      handleToggleFavorite: jest.fn(),
      isSaving: true,
    });

    render(<FavoriteProject project={mockProject} />);
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteButton).toBeDisabled();
  });
});
