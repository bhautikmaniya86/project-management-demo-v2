import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import React from 'react';
import { ProjectCardListing, ProjectTableListing } from './components';
import useProjectList from './useProjectList';

const ProjectList = () => {
  const { isProjectLoading, projects, handleCreateProject } = useProjectList();
  return (
    <div className="bg-purple-200 w-full md:p-8 p-4 text-2xl !pt-20 h-full overflow-y-auto pb-24">
      <div className="my-5 flex justify-between items-center">
        <h4>Projects</h4>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCreateProject}
          className="!rounded-lg gap-2 !shadow-none !bg-transparent !h-10 !border-2 !border-[#ff717080] hover:!border-pink-200 !text-white hover:!text-pink-200"
        >
          <PlusIcon className="size-4" />
          Create Project
        </Button>
      </div>

      <ProjectTableListing
        projects={projects}
        isProjectLoading={isProjectLoading}
      />
      <div className="md:hidden">
        <ProjectCardListing
          projects={projects}
          isProjectLoading={isProjectLoading}
        />
      </div>
    </div>
  );
};

export default ProjectList;
