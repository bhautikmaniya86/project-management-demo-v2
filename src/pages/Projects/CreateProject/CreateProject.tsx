import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectForm } from '../components';
import useCreateProject from './useCreateProject';

const CreateProject = () => {
  const { submitHandler, isCreatingProject } = useCreateProject();

  return (
    <div
      data-testid="create-project-container"
      className="w-full md:p-8 p-4 h-full pb-24 overflow-y-auto bg-purple-200"
    >
      <div className="flex pb-5 gap-3 fixed z-[9] bg-purple-200 md:pt-16 pt-20 w-full">
        <Link to="/projects" className="flex items-center">
          <ArrowLeftIcon className="w-5" />
        </Link>
        <h2 className="text-2xl font-bold">Create New Project</h2>
      </div>
      <ProjectForm
        submitHandler={submitHandler}
        isSavingProject={isCreatingProject}
      />
    </div>
  );
};

export default CreateProject;
