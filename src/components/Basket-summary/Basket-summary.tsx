import React, { useContext } from 'react';
import { productsAmountInBasket, productsPriceInBasket, getSumFormat } from '../../utils/helper';
import { BasketContext } from '../../App';
import './Basket-summary.scss';
import useModal from '../../hooks/modalWindow';
import ModalWindow from '../Modal-window/Modal-window';

const BasketSummary = () => {
  const { basketState } = useContext(BasketContext);

  const { isOpen, changeModalVisibility } = useModal();

  return (
    <div className='basket-summary'>
      <h2 className='basket-summary__title'>Summary</h2>
      <p className='basket-summary__items'>Products: {productsAmountInBasket(basketState)} </p>
      <p className='basket-summary__sum'>{getSumFormat(productsPriceInBasket(basketState))}</p>
      <span>
        <input type='text' placeholder='Enter promo code' className='basket-summary__promo-code' />
      </span>
      <span>
        <button className='basket-summary__button' onClick={changeModalVisibility}>
          buy now
        </button>
        <ModalWindow isOpen={isOpen} changeModalVisibility={changeModalVisibility} />
      </span>
    </div>
  );
};

export default BasketSummary;
