import React, { useContext } from 'react';
import { productsAmountInBasket, productsPriceInBasket, getSumFormat } from '../../utils/helper';
import { BasketContext } from '../../App';
import './Basket-summary.scss';

const BasketSummary = () => {
  const { basketState } = useContext(BasketContext);

  return (
    <div className='basket-summary'>
      <h2 className='basket-summary__title'>Summary</h2>
      <p className='basket-summary__items'>Products: {productsAmountInBasket(basketState)} </p>
      <p className='basket-summary__sum'>{getSumFormat(productsPriceInBasket(basketState))}</p>
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
