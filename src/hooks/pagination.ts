import { useState, useEffect } from 'react';
import { AppStateBasket } from './basketReducer';

export const usePagination = (productsPerPage: string, arrayOfProducts: AppStateBasket[]) => {
  const [page, setPage] = useState(1);

  const numProductsPerPage = +productsPerPage;

  useEffect(() => {
    setPage(1);
  }, [productsPerPage]);

  useEffect(() => {
    if (arrayOfProducts.length === (page - 1) * numProductsPerPage) setPage(page - 1);
  }, [page, setPage, productsPerPage, arrayOfProducts]);

  const endIndexOfPage: number = numProductsPerPage * page;
  const startIndexOfPage: number = endIndexOfPage - numProductsPerPage;
  const pagesQuantity: number = Math.ceil(arrayOfProducts.length / numProductsPerPage);

  const prevPage = (): void => setPage((page) => Math.max(1, page - 1));
  const nextPage = (): void => setPage((page) => Math.min(pagesQuantity, page + 1));

  return {
    page,
    endIndexOfPage,
    startIndexOfPage,
    pagesQuantity,
    prevPage,
    nextPage,
  };
};
