import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './pages/Main';
import Basket from './pages/Basket';
import ErrorPage from './pages/Error';
import { createContext, useReducer, Dispatch } from 'react';
import { BasketState, actionType, basketReducer } from './hooks/basketReducer';
import ProductDetails from './components/Product-details/Product-details';

export const BasketContext = createContext<{
  basketState: BasketState;
  dispatch: Dispatch<actionType>;
}>({
  basketState: [],
  dispatch: () => null,
});

function App() {
  const [basketState, dispatch] = useReducer(basketReducer, []);

  return (
    <>
      <BasketContext.Provider value={{ basketState, dispatch }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='basket' element={<Basket />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='error' element={<ErrorPage />} />
          </Route>
        </Routes>
      </BasketContext.Provider>
    </>
  );
}

export default App;
