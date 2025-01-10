import { Project } from '@/types/projects';
import React from 'react';
import EditProject from '../../EditProject/EditProject';
import FavoriteProject from '../../FavoriteProject/FavoriteProject';

type ProjectListingType = {
  project: Project;
};

const MobileCard = ({ project }: ProjectListingType) => {
  const projectDetails = [
    { label: 'Project ID:', value: project.id },
    { label: 'Project Name:', value: project.projectName },
    { label: 'Start Date:', value: project.startDate },
    { label: 'End Date:', value: project.endDate },
    { label: 'Project Manager:', value: project.projectManager },
  ];

  return (
    <div className='mt-5 bg-purple-400 p-4 rounded-lg flex flex-col gap-3'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          {projectDetails.map((detail, index) => (
            <div key={index} className='flex'>
              <span className='text-sm font-bold flex-shrink-0'>
                {detail.label}
              </span>
              <span className='text-sm ml-2 flex-shrink-0'>{detail.value}</span>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:items-end gap-3'>
          <span className='text-sm font-bold md:block hidden'>Actions:</span>
          <div className='flex gap-2'>
            <EditProject project={project} />
            <FavoriteProject project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
