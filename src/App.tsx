import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './pages/Main';
import Basket from './pages/Basket';
import ErrorPage from './pages/Error';
import { createContext, useReducer, Dispatch, useEffect } from 'react';
import {
  BasketState,
  actionType,
  basketReducer,
  initBasket,
  initState,
} from './hooks/basketReducer';
import ProductDetails from './components/Product-details/Product-details';

export const BasketContext = createContext<{
  basketState: BasketState;
  dispatch: Dispatch<actionType>;
}>({
  basketState: initState,
  dispatch: () => null,
});

function App(): JSX.Element {
  const [basketState, dispatch] = useReducer(basketReducer, initState, initBasket);

  useEffect(() => {
    localStorage.setItem('basketState', JSON.stringify(basketState));
  }, [basketState]);

  return (
    <>
      <BasketContext.Provider value={{ basketState, dispatch }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='basket' element={<Basket />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </BasketContext.Provider>
    </>
  );
}

export default App;
