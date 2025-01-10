import { useGetProjects } from '@/services/projects';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useNavigate } from 'react-router-dom';
import useProjectList from './useProjectList';
import useProjectTableListing from './components/ProjectTableListing/useProjectTableListing';
import { Project } from '@/types/projects';

// Mock the dependencies
jest.mock('@/services/projects');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useProjectList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return projects when data is available', () => {
    const mockProjects = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
    ];
    (useGetProjects as jest.Mock).mockReturnValue({
      data: { data: mockProjects },
      isLoading: false,
    });

    const { result } = renderHook(() => useProjectList());

    expect(result.current.projects).toEqual(mockProjects);
    expect(result.current.isProjectLoading).toBe(false);
  });

  it('should return empty array when data is not available', () => {
    (useGetProjects as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useProjectList());

    expect(result.current.projects).toEqual([]);
    expect(result.current.isProjectLoading).toBe(false);
  });

  it('should return isProjectLoading as true when loading', () => {
    (useGetProjects as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useProjectList());

    expect(result.current.isProjectLoading).toBe(true);
  });

  it('should navigate to create project page when handleCreateProject is called', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useGetProjects as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useProjectList());

    act(() => {
      result.current.handleCreateProject();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/projects/new');
  });

describe('useProjectTableListing', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      projectName: 'Website Redesign',
      startDate: '2023-01-15',
      endDate: '2023-06-30',
      projectManager: 'Alice Johnson',
      projectDescription: 'Redesign and modernize the company website for better user experience.',
      isFavorite: true
    },
    {
      id: '2',
      projectName: 'Mobile App Development',
      startDate: '2023-03-01',
      endDate: '2023-09-30',
      projectManager: 'Bob Smith',
      projectDescription: 'Develop a new mobile app for both iOS and Android platforms.',
      isFavorite: false
    },
    {
      id: '3',
      projectName: 'Data Migration',
      startDate: '2023-02-15',
      endDate: '2023-05-31',
      projectManager: 'Charlie Brown',
      projectDescription: 'Migrate data from legacy systems to new cloud-based infrastructure.',
      isFavorite: true
    },
    {
      id: '4',
      projectName: 'AI Integration',
      startDate: '2023-04-01',
      endDate: '2023-12-31',
      projectManager: 'Diana Prince',
      projectDescription: 'Integrate AI capabilities into existing product suite.',
      isFavorite: false
    },
    {
      id: '5',
      projectName: 'Security Audit',
      startDate: '2023-05-01',
      endDate: '2023-07-31',
      projectManager: 'Ethan Hunt',
      projectDescription: 'Conduct a comprehensive security audit of all systems and processes.',
      isFavorite: true
    }
  ];

  it('should change page correctly', () => {
    const { result } = renderHook(() => useProjectTableListing({ projects: mockProjects }));

    act(() => {
      result.current.handleChangePage({} as unknown as React.MouseEvent<HTMLButtonElement>, 1);
    });

    expect(result.current.page).toBe(1);
  });

  it('should change rows per page correctly and reset to first page', () => {
    const { result } = renderHook(() => useProjectTableListing({ projects: mockProjects }));

    act(() => {
      result.current.handleChangeRowsPerPage({
        target: { value: '10' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.rowsPerPage).toBe(10);
    expect(result.current.page).toBe(0);
  });

});


});
