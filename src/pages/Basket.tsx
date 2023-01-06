import React, { useContext, useState, useEffect } from 'react';
import BasketSummary from '../components/Basket-summary/Basket-summary';
import BasketList from '../components/Basket-list/Basket-list';
import { BasketContext } from '../App';
import Popup from '../components/Popup/Popup';
import usePopup from '../hooks/popup';
import './Basket.scss';

const Basket = () => {
  const { basketState } = useContext(BasketContext);
  const { isOpenPopup, togglePopup } = usePopup();

  return basketState.length ? (
    <div className='basket-container'>
      <div className='basket-list__container'>
        <BasketList />
      </div>
      <div className='basket-summary__container'>
        <BasketSummary togglePopup={togglePopup} />
      </div>
    </div>
  ) : (
    <>
      <h2 className='empty-basket-message'>
        Your basket is empty yet, wish you find something interesting for yourself in our store
      </h2>
      {isOpenPopup && (
        <Popup
          message={'your order is placed, in a few seconds you will return to the main page'}
          togglePopup={togglePopup}
          isOpenPopup={isOpenPopup}
        />
      )}
    </>
  );
};

export default Basket;
