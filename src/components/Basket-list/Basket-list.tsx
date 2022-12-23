import React, { useContext } from 'react';
import './Basket-list.scss';
import { BasketContext } from '../../App';
import { EURO_SYMBOL, products } from '../../utils/data';
import { Product } from '../../utils/types';
import { AppStateBasket, basketActionTypes } from '../../hooks/basketReducer';
import { itemPriceInBasket } from '../../utils/helper';

const BasketList = () => {
  const { basketState, dispatch } = useContext(BasketContext);

  const basketItems = () => {
    console.log(basketState);
    if (Object.keys(basketState).length) {
      const productObjects = basketState.map((el: AppStateBasket) => {
        return products.find((product: Product) => product.id === el.id);
      });
      return productObjects.map((product, index) => {
        if (product) {
          return (
            <li key={product.id} className='product-list-item'>
              <span className='product-list-item__index'>{index + 1}</span>
              <img
                className='product-list-item__photo'
                src={product.images[0]}
                alt={`${product.title} photo`}
              />
              <div className='product-list-item__box'>
                <h3 className='product-list-item__title'>{product.title}</h3>
                <h3 className='product-list-item__description'>{product.description}</h3>
                <div className='product-list-item__rating-discount'>
                  <span className='product-list-item__rating'>Rating: {product.rating}</span>
                  <span className='product-list-item__discount'>
                    Discount: {product.discountPercentage}
                  </span>
                </div>
              </div>
              <div className='product-list-item__stock-price'>
                <div className='product-list-item__stock'>Stock: {product.stock}</div>
                <div className='product-list-item__quantity'>
                  <button
                    className='change-quantity'
                    onClick={() =>
                      dispatch({ type: basketActionTypes.DECREASE, payload: product.id })
                    }
                  >
                    -
                  </button>
                  <span>
                    {basketState.filter((el) => el.id === product.id).map((el) => el.quantity)[0]}
                  </span>
                  <button
                    className='change-quantity'
                    onClick={() =>
                      dispatch({ type: basketActionTypes.INCREASE, payload: product.id })
                    }
                  >
                    +
                  </button>
                </div>
                <div className='product-list-item__price'>
                  {EURO_SYMBOL}
                  {new Intl.NumberFormat('ru-RU').format(
                    itemPriceInBasket(
                      basketState.find((el: AppStateBasket) => el.id === product.id)
                    )
                  )}
                </div>
              </div>
            </li>
          );
        }
      });
    } else {
      return 'Your basket is empty yet, wish you find something interesting for yourself in our store';
    }
  };

  return (
    <div className='basket-list'>
      <h2 className='basket-list__title'>Products in Basket</h2>
      <ul className='basket-list__box'>{basketItems()}</ul>
    </div>
  );
};

export default BasketList;
