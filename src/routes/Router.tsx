import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from '../components/AppLayout/AppLayout';
import { CreateProject, EditProject, ProjectDetail, Projects } from '../pages';

const Router = () => {
  let element = useRoutes([
    {
      index: true,
      element: <Navigate to='/projects' replace />,
    },
    {
      path: '/projects',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Projects />,
        },
        {
          path: ':projectId',
          element: <ProjectDetail />,
        },
        {
          path: ':projectId/edit',
          element: <EditProject />,
        },
        {
          path: 'new',
          element: <CreateProject />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/projects' replace />,
    },
  ]);

  return element;
};

export default Router;
