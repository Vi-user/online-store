import React, { useContext, useState } from 'react';
import { BasketContext } from '../../App';
import { products } from '../../utils/data';
import { Product } from '../../utils/types';
import { AppStateBasket, basketActionTypes } from '../../hooks/basketReducer';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '../../hooks/pagination';
import './Basket-list.scss';
import ProductListItem from '../Product-list-item/Product-list-item';
import { useSearchParams } from 'react-router-dom';

const BasketList = (): JSX.Element => {
  const [pageNumber, setPageNumber] = useSearchParams();

  const { basketState, dispatch } = useContext(BasketContext);

  const getQuantityInStock = (id: number): number | undefined => {
    return products?.find((product: Product) => product.id === id)?.stock;
  };

  const getQuantityInBasket = (id: number): number => {
    return basketState?.find((product: AppStateBasket) => product.id === id)?.quantity || 0;
  };

  const isAvailableMinimum = (id: number): void => {
    const quantityInBasket = getQuantityInBasket(id);
    if (quantityInBasket === 1) {
      dispatch({ type: basketActionTypes.DELETE, payload: id });
    } else {
      dispatch({ type: basketActionTypes.DECREASE, payload: id });
    }
  };

  const isEnoughInStock = (id: number): void => {
    const quantityInStock = getQuantityInStock(id);
    const quantityInBasket = getQuantityInBasket(id);
    if (quantityInStock === quantityInBasket) {
      return;
    } else {
      dispatch({ type: basketActionTypes.INCREASE, payload: id });
    }
  };

  const basketItems = () => {
    return productsToShow.map((el: AppStateBasket, index) => {
      const product = products.find((product: Product) => product.id === el.id);

      if (product) {
        return (
          <ProductListItem
            key={product.id}
            basketObj={el}
            product={product}
            index={index}
            startIndexOfPage={startIndexOfPage}
            isAvailableMinimum={isAvailableMinimum}
            isEnoughInStock={isEnoughInStock}
            getQuantityInBasket={getQuantityInBasket}
          />
        );
      }
    });
  };
  const productOnPage = pageNumber.get('limit') || '10';
  const currentPage = Number(pageNumber.get('page')) || 1;
  const [productsPerPage, setProductsPerPage] = useState(productOnPage);
  const { page, pagesQuantity, startIndexOfPage, endIndexOfPage, prevPage, nextPage } =
    usePagination(productsPerPage, basketState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentParams = Object.fromEntries([...pageNumber]);
    const value = e.target.value.replace(/[^\d ]/gi, '');
    setProductsPerPage(value);
    setPageNumber({ ...currentParams, limit: value });
  };

  const productsToShow = basketState.slice(startIndexOfPage, endIndexOfPage);

  const handleClickPage = (p: number) => {
    const currentParams = Object.fromEntries([...pageNumber]);
    setPageNumber({ ...currentParams, page: `${p}` });
  };

  return (
    <div className='basket-list'>
      <div className='basket-list__title-container'>
        <h2 className='basket-list__title'>Products in Basket</h2>
        <Pagination
          page={page}
          pagesQuantity={pagesQuantity}
          productsPerPage={productsPerPage}
          prevPage={prevPage}
          nextPage={nextPage}
          handleChange={handleChange}
          handleClickPage={handleClickPage}
        />
      </div>
      <ul className='basket-list__box'>{basketItems()}</ul>
    </div>
  );
};

export default BasketList;
