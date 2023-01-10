import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className='main__wrapper'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
