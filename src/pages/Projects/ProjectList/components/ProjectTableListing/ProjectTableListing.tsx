import { CircularProgress, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import { Project } from '@/types/projects';
import EditProject from '../EditProject/EditProject';
import FavoriteProject from '../FavoriteProject/FavoriteProject';
import useProjectTableListing from './useProjectTableListing';

type ProjectListingType = {
  projects: Project[];
  isProjectLoading: boolean;
};

const columns = [
  {
    key: 'id',
    label: 'Project ID',
  },
  {
    key: 'projectName',
    label: 'Project Name',
  },
  {
    key: 'startDate',
    label: 'Start Date',
  },
  {
    key: 'endDate',
    label: 'End Date',
  },
  {
    key: 'projectManager',
    label: 'Project Manager',
  },

  {
    label: 'Actions',
    renderCell: (data: Project) => {
      return (
        <div className='flex gap-1 items-center'>
          <FavoriteProject project={data} /> <EditProject project={data} />
        </div>
      );
    },
    key: 'action',
  },
];

const ProjectTableListing = ({
  projects,
  isProjectLoading,
}: ProjectListingType) => {
  const {
    page,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
  } = useProjectTableListing({ projects });

  return (
    <>
      <TableContainer
        component={Paper}
        className='!bg-purple-100 !rounded-xl md:block hidden h-[422px] max-h-[422px]'
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map(({ key, label, renderCell }) => (
                <TableCell
                  key={key}
                  className='!text-white !border-white/20 !font-semibold !bg-purple-100'
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {isProjectLoading ? (
            <>
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell colSpan={6} className='!text-center'>
                    <CircularProgress
                      size={30}
                      classes={{ colorPrimary: '!text-white' }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          ) : (
            <TableBody>
              {Array.isArray(paginatedData) &&
                paginatedData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {columns.map(({ key, renderCell }) => (
                      <TableCell
                        key={row.id + key}
                        className='bg-purple-400 !text-white !border-white/20'
                      >
                        {renderCell ? renderCell(row) : row[key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        className='hidden md:block !text-white'
        sx={{ ':disabled': '#ff6600' }}
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
        component='div'
        count={projects.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ProjectTableListing;
