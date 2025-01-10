import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

import FavoriteOutlineIcon from '@/assets/icons/FavoriteOutlineIcon';
import FavoriteSolidIcon from '@/assets/icons/FavoriteSolidIcon';
import { Project } from '@/types/projects';
import useFavoriteProject from './useFavoriteProject';

type FavoriteProjectProps = {
  project: Project;
};

const FavoriteProject = ({ project }: FavoriteProjectProps) => {
  console.log('project', project);

  const { handleToggleFavorite, isSaving } = useFavoriteProject({
    project,
  });

  return (
    <>
      <Tooltip title='Favorites'>
        <IconButton
          aria-label='favorite'
          disabled={isSaving}
          onClick={handleToggleFavorite}
          className='md:!p-2 !p-0'
        >
          {project.isFavorite ? <FavoriteSolidIcon /> : <FavoriteOutlineIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default FavoriteProject;
