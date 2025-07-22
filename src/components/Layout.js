import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
