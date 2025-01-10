import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectForm } from '../components';
import useEditProject from './useEditProject';

const EditProject = () => {
  const { projectData, isFetchingData, submitHandler, isSavingProject } =
    useEditProject();

  if (isFetchingData || !projectData) {
    return (
      <div className="flex justify-center my-96">
        <CircularProgress size={30} classes={{ colorPrimary: '!text-white' }} />
      </div>
    );
  }

  return (
    <div className="w-full md:p-8 p-4 h-full pb-24 overflow-y-auto bg-purple-200">
      <div className="flex pb-5 gap-3 fixed z-[9] bg-purple-200 md:pt-16 pt-20 w-full">
        <Link to="/projects" className="flex items-center">
          <ArrowLeftIcon className="w-5" />
        </Link>
        <h2 className="text-2xl font-bold">Edit Details</h2>
      </div>
      <ProjectForm
        project={projectData}
        submitHandler={submitHandler}
        isSavingProject={isSavingProject}
      />
    </div>
  );
};

export default EditProject;
