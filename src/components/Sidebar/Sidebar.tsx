import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { FavoriteProjectList } from './components';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className='md:hidden absolute top-4 right-4 z-50'>
        <IconButton
          onClick={toggleMobileMenu}
          className='p-2 !rounded-md !bg-purple-400 !text-white !shadow-lg focus:outline-none'
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className='w-5' />
          ) : (
            <Bars3Icon className='w-5' />
          )}
        </IconButton>
      </div>

      {/* Sidebar */}
      <div
        role="complementary"
        className={`fixed top-0 left-0 h-full w-72 bg-purple-100 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0 z-50' : '-translate-x-full'
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <FavoriteProjectList handleCloseMobileMenu={handleCloseMobileMenu} />
      </div>

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          data-testid="mobile-menu-overlay"
          className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
