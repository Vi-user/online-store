import React from 'react';
import BasketSummary from '../components/Basket-summary/Basket-summary';
import BasketList from '../components/Basket-list/Basket-list';

const Basket = () => {
  return (
    <div className='basket-container'>
      <div className='basket-list__container'>
        <BasketList />
      </div>
      <div className='basket-summary__container'>
        <BasketSummary />
      </div>
    </div>
  );
};

export default Basket;
