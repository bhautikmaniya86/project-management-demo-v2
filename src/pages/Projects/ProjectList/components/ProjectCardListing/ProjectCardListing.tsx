import { Project } from '@/types/projects';
import { CircularProgress } from '@mui/material';
import React from 'react';
import MobileCard from './components/MobileCard';

type ProjectCardListingProps = {
  projects: Project[];
  isProjectLoading: boolean;
};

const ProjectCardListing = ({
  projects,
  isProjectLoading,
}: ProjectCardListingProps) => {
  if (isProjectLoading) {
    return (
      <div className="text-center py-20">
        <CircularProgress size={30} classes={{ colorPrimary: '!text-white' }} />
      </div>
    );
  }
  return projects.map((project) => (
    <MobileCard key={project.id} project={project} />
  ));
};

export default ProjectCardListing;
