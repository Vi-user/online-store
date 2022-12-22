import React from 'react';
import BasketSummary from '../components/Basket-summary/Basket-summary';

const Basket = () => {
  return (
    <>
      <div>basket items</div>
      <div className='basket-summary__container'>
        <BasketSummary />
      </div>
    </>
  );
};

export default Basket;
