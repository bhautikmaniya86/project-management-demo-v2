import { Project } from '@/types/projects';
import React from 'react';

const useProjectTableListing = ({ projects }: { projects: Project[] }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Paginated data
  const paginatedData =
    Array.isArray(projects) &&
    projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedData,
    page,
    rowsPerPage,
  };
};

export default useProjectTableListing;
