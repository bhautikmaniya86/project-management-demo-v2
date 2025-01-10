import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router';

import theme from '@/utils/theme';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="w-full h-screen">
            <Outlet />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default AppLayout;
