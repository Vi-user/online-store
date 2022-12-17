import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './pages/Main';
import Basket from './pages/Basket';
import Product from './pages/Product';
import ErrorPage from './pages/Error';
import './App.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='basket' element={<Basket />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='error' element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
