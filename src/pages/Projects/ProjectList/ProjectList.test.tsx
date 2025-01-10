import { ToastProvider } from '@/context/ToastContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ProjectList from './ProjectList';
import useProjectList from './useProjectList';

jest.mock('./useProjectList');

const renderWithProviders = (ui) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{ui}</ToastProvider>
    </QueryClientProvider>
  );
};

describe('ProjectList Component', () => {
  it('calls handleCreateProject when the button is clicked', () => {
    const handleCreateProjectMock = jest.fn();

    useProjectList.mockReturnValue({
      isProjectLoading: false,
      projects: [],
      handleCreateProject: handleCreateProjectMock,
    });

    renderWithProviders(<ProjectList />);

    // Get the "Create Project" button
    const createProjectButton = screen.getByRole('button', {
      name: /create project/i,
    });

    // Simulate button click
    fireEvent.click(createProjectButton);

    // Assert that handleCreateProject is called
    expect(handleCreateProjectMock).toHaveBeenCalledTimes(1);
  });
});
