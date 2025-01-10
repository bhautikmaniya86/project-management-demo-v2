import { render, screen } from '@testing-library/react';
import React from 'react';

import Header from './Header';

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('Header Component', () => {
  test('renders the header with the correct text', () => {
    render(<Header />);

    // Check if the "Project Management" text is present
    expect(screen.getByText(/Project Management/i)).toBeInTheDocument();
  });

  test('applies correct styles', () => {
    const { container } = render(<Header />);

    // Check if the header has the fixed positioning and purple background color
    const header = container.firstChild;
    expect(header).toHaveClass('bg-purple-300');
    expect(header).toHaveClass('fixed');
    expect(header).toHaveClass('w-full');
  });
});
