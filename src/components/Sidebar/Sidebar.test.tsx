import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Sidebar from './Sidebar';

// Mock the FavoriteProjectList component
jest.mock('./components', () => ({
  FavoriteProjectList: ({ handleCloseMobileMenu }: { handleCloseMobileMenu: () => void }) => (
    <div data-testid="favorite-project-list">
      Mocked FavoriteProjectList
      <button onClick={handleCloseMobileMenu}>Close Menu</button>
    </div>
  ),
}));

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('renders the hamburger icon on mobile', () => {
    render(<Sidebar />);
    expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger icon is clicked', () => {
    render(<Sidebar />);
    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    
    fireEvent.click(hamburgerButton);
    expect(screen.getByRole('complementary')).toHaveClass('translate-x-0');
    
    fireEvent.click(hamburgerButton);
    expect(screen.getByRole('complementary')).toHaveClass('-translate-x-full');
  });

  it('renders FavoriteProjectList component', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('favorite-project-list')).toBeInTheDocument();
  });

  it('closes mobile menu when overlay is clicked', () => {
    render(<Sidebar />);
    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    
    fireEvent.click(hamburgerButton);
    expect(screen.getByRole('complementary')).toHaveClass('translate-x-0');
    
    const overlay = screen.getByTestId('mobile-menu-overlay');
    fireEvent.click(overlay);
    expect(screen.getByRole('complementary')).toHaveClass('-translate-x-full');
  });

  it('closes mobile menu when handleCloseMobileMenu is called', () => {
    render(<Sidebar />);
    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    
    fireEvent.click(hamburgerButton);
    expect(screen.getByRole('complementary')).toHaveClass('translate-x-0');
    
    const closeButton = screen.getByText('Close Menu');
    fireEvent.click(closeButton);
    expect(screen.getByRole('complementary')).toHaveClass('-translate-x-full');
  });

  it('renders correctly on desktop', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize'));

    render(<Sidebar />);
    expect(screen.getByRole('complementary')).toHaveClass('md:translate-x-0');
  });
});

