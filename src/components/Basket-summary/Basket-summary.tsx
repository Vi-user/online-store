import React, { useContext } from 'react';
import './Basket-summary.scss';
import { ProductsAmountInBasket, ProductsPriceInBasket } from '../../utils/helper';
import { BasketContext } from '../../App';
import { EURO_SYMBOL } from '../../utils/data';

const BasketSummary = () => {
  const { basketState } = useContext(BasketContext);

  return (
    <div className='basket-summary'>
      <h2 className='basket-summary__title'>Summary</h2>
      <p className='basket-summary__items'>Products: {ProductsAmountInBasket(basketState)} </p>
      <p className='basket-summary__sum'>
        Total: {EURO_SYMBOL}{' '}
        {new Intl.NumberFormat('ru-RU').format(ProductsPriceInBasket(basketState))}
      </p>
      <span>
        <input type='text' placeholder='Enter promo code' className='basket-summary__promo-code' />
      </span>
      <span>
        <button className='basket-summary__button'>buy now</button>
      </span>
    </div>
  );
};

export default BasketSummary;
