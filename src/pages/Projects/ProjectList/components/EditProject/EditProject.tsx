import { Project } from '@/types/projects';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type EditProjectProps = {
  project: Project;
};

const EditProject = ({ project }: EditProjectProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/projects/${project.id}/edit`);
  };
  return (
    <Button
      variant='outlined'
      color='primary'
      className='!rounded-lg gap-2 md:!py-2 !py-0 !shadow-none !bg-transparent md:!h-10 !h-auto !border-2 !border-transparent hover:!border-pink-200 !text-white hover:!text-pink-200'
      aria-label='edit'
      onClick={handleEdit}
    >
      <PencilIcon className='md:size-4 size-5' />
      <span className='md:block hidden'>Edit</span>
    </Button>
  );
};

export default EditProject;
