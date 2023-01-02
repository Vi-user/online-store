import React, { useContext } from 'react';
import BasketSummary from '../components/Basket-summary/Basket-summary';
import BasketList from '../components/Basket-list/Basket-list';
import { BasketContext } from '../App';
import './Basket.scss';

const Basket = () => {
  const { basketState } = useContext(BasketContext);

  return basketState.length ? (
    <div className='basket-container'>
      <div className='basket-list__container'>
        <BasketList />
      </div>
      <div className='basket-summary__container'>
        <BasketSummary />
      </div>
    </div>
  ) : (
    <h2 className='empty-basket-message'>
      Your basket is empty yet, wish you find something interesting for yourself in our store
    </h2>
  );
};

export default Basket;
