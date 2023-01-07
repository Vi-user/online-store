import React, { useContext } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { productsPriceInBasket, productsAmountInBasket, getSumFormat } from '../../utils/helper';
import { BasketContext } from '../../App';

const Header = (): JSX.Element => {
  const { basketState } = useContext(BasketContext);

  return (
    <div className='header__wrapper'>
      <header className='header'>
        <Link className='logo' to='/'>
          Online Store
        </Link>
        <div className='cart__total'>
          Cart total: {getSumFormat(productsPriceInBasket(basketState))}
        </div>
        <Link className='logo__basket' to='/basket'>
          <span className='logo__basket-sum'>{productsAmountInBasket(basketState)}</span>
        </Link>
      </header>
    </div>
  );
};

export default Header;
