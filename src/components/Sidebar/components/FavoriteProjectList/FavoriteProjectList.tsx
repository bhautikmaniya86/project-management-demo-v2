import { CircularProgress } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useFavoriteProjectList from './useFavoriteProjectList';

type FavoriteProjectListProps = {
  handleCloseMobileMenu: () => void;
};

const ProjectsList = styled.ul`
  background-color: #6b048c;
  border-radius: 0.5rem;
  margin-top: 3rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  gap: 0.5rem;

  overflow: auto;
`;

const FavoriteProjectList = ({
  handleCloseMobileMenu,
}: FavoriteProjectListProps) => {
  const { isFavoriteProjectsLoading, favoriteProjects } =
    useFavoriteProjectList();

  return (
    <div className='p-4 md:mt-16 h-screen'>
      <h2 className='text-lg flex pb-5 gap-3 fixed z-[9] bg-purple-100 w-max'>
        Favorite Projects
      </h2>
      {isFavoriteProjectsLoading ? (
        <div className='text-center py-4 mt-10'>
          <CircularProgress
            size={30}
            classes={{ colorPrimary: '!text-white' }}
          />
        </div>
      ) : (
        <ProjectsList className='md:h-[84%] h-3/4'>
          {favoriteProjects.length > 0
            ? favoriteProjects.map((favoriteProject) => (
                <li key={favoriteProject.id} onClick={handleCloseMobileMenu}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'px-4 py-3 block cursor-pointer bg-[#0000001a] text-white rounded-lg'
                        : 'px-4 py-3 block cursor-pointer hover:bg-[#0000001a] text-purple-500 hover:text-white rounded-lg'
                    }
                    to={`/projects/${favoriteProject.id}`}
                    // className='px-4 py-3 block cursor-pointer hover:bg-[#0000001a] text-purple-500 hover:text-white rounded-lg'
                  >
                    {favoriteProject.projectName}
                  </NavLink>
                </li>
              ))
            : 'No Favorites Projects Found'}
        </ProjectsList>
      )}
    </div>
  );
};

export default FavoriteProjectList;
