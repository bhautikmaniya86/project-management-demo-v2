import { PencilIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteProject from '../ProjectList/components/FavoriteProject/FavoriteProject';
import useProjectDetail from './useProjectDetail';

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}

const ProjectDetail = () => {
  const {
    projectData,
    isProjectLoading,
    handleBackNavigate,
    handleEditButton,
  } = useProjectDetail();

  if (isProjectLoading || !projectData) {
    return (
      <div className='flex justify-center my-96'>
        <CircularProgress size={30} classes={{ colorPrimary: '!text-white' }} />
      </div>
    );
  }

  const details: { label: string; key: keyof Project }[] = [
    { label: 'Project ID', key: 'id' },
    { label: 'Project Name', key: 'projectName' },
    { label: 'Description', key: 'projectDescription' },
    { label: 'Start Date', key: 'startDate' },
    { label: 'End Date', key: 'endDate' },
    { label: 'Project Manager', key: 'projectManager' },
  ];

  return (
    <div className='w-full md:p-8 p-4 h-full pt-0 pb-10 overflow-y-auto bg-purple-200'>
      <div className='flex pb-5 gap-3 fixed z-[9] bg-purple-200 md:pt-16 pt-20 w-full'>
        <Link to='/projects' className='flex items-center'>
          <ArrowLeftIcon className='w-5' />
        </Link>
        <h2 className='text-2xl font-bold'>
          {projectData.data.projectName} Details
        </h2>
      </div>
      <div className='bg-purple-400 p-8 rounded-xl relative max-w-md md:mt-32 mt-36'>
        <div className='absolute right-8 top-8'>
          <FavoriteProject project={projectData.data} />
        </div>
        <div className='text-base flex flex-col gap-6'>
          {details.map(({ label, key }) => (
            <div key={key} className='flex md:gap-8 md:flex-row flex-col'>
              <div className='font-medium md:w-36 flex-shrink-0 text-purple-500'>
                {label}
              </div>
              <div className='flex gap-2 text-gray-100'>
                {' '}
                <span className='text-purple-500 md:block hidden'>:</span>{' '}
                {projectData.data[key]}
              </div>
            </div>
          ))}
        </div>

        <div className='flex md:gap-6 gap-3 mt-9'>
          <Button
            onClick={handleBackNavigate}
            variant='contained'
            color='primary'
            className='!bg-pink-100 !shadow-none !rounded-lg !h-10 !px-8 !font-semibold gap-2 md:w-auto w-full'
          >
            <ArrowLeftIcon className='size-4' />
            Back
          </Button>

          <Button
            onClick={handleEditButton}
            variant='outlined'
            color='primary'
            className='md:w-auto w-full !rounded-lg gap-2 !shadow-none !bg-transparent !h-10 !px-8 !border-2 !border-[#ff717080] hover:!border-pink-200 !text-white hover:!text-pink-200'
          >
            <PencilIcon className='size-4' />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
