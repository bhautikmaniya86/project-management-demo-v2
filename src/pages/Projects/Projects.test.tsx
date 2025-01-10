import { render, screen } from '@testing-library/react';
import React from 'react';
import Projects from './Projects';

// Mock the ProjectList component
jest.mock('./ProjectList/ProjectList', () => {
  return function MockProjectList() {
    return <div data-testid="mock-project-list">Mock Project List</div>;
  };
});

describe('Projects Component', () => {
  it('renders without crashing', () => {
    render(<Projects />);
    expect(screen.getByTestId('mock-project-list')).toBeInTheDocument();
  });

  it('renders the ProjectList component', () => {
    render(<Projects />);
    expect(screen.getByText('Mock Project List')).toBeInTheDocument();
  });

  it('does not render any additional content', () => {
    const { container } = render(<Projects />);
    expect(container.firstChild).toMatchSnapshot();
  });

});
