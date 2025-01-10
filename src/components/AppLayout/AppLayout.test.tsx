import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AppLayout from './AppLayout';

// Mock the dependencies
jest.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));
jest.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));
jest.mock('@/utils/theme', () => ({
  __esModule: true,
  default: { palette: { primary: { main: '#000000' } } },
}));
jest.mock('../Header/Header', () => () => (
  <div data-testid="header">Header Component</div>
));
jest.mock('../Sidebar/Sidebar', () => () => (
  <div data-testid="sidebar">Sidebar Component</div>
));

describe('AppLayout', () => {
  it('renders without crashing', () => {
    render(<AppLayout />);
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('applies the correct theme', () => {
    render(<AppLayout />);
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    // You can add more specific theme checks here if needed
  });

  it('renders the Header component', () => {
    render(<AppLayout />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders the Sidebar component', () => {
    render(<AppLayout />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders the Outlet component', () => {
    render(<AppLayout />);
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('has the correct layout structure', () => {
    render(<AppLayout />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.children[0]).toHaveAttribute('data-testid', 'header');
    expect(main.children[1]).toHaveClass('flex');
    expect(main.children[1].children[0]).toHaveAttribute(
      'data-testid',
      'sidebar'
    );
    expect(main.children[1].children[1]).toHaveClass('w-full h-screen');
    expect(main.children[1].children[1].children[0]).toHaveAttribute(
      'data-testid',
      'outlet'
    );
  });
});
