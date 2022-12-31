import { useState, useEffect } from 'react';
import { AppStateBasket } from './basketReducer';

export const usePagination = (productsPerPage: number, arrayOfProducts: AppStateBasket[]) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [productsPerPage]);

  useEffect(() => {
    if (arrayOfProducts.length === (page - 1) * productsPerPage) setPage(page - 1);
  }, [page, setPage, productsPerPage, arrayOfProducts]);

  const endIndexOfPage: number = productsPerPage * page;
  const startIndexOfPage: number = endIndexOfPage - productsPerPage;
  const pagesQuantity: number = Math.ceil(arrayOfProducts.length / productsPerPage);

  const prevPage = (): void => setPage((page) => Math.max(1, page - 1));
  const nextPage = (): void => setPage((page) => Math.min(pagesQuantity, page + 1));

  return {
    page,
    endIndexOfPage,
    startIndexOfPage,
    prevPage,
    nextPage,
  };
};
