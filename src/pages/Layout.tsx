import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div>header</div>
      <hr />
      <Outlet />
      <hr />
      <div>footer</div>
    </>
  );
};

export default Layout;
