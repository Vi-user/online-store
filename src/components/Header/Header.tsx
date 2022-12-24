import React, { useContext } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { ProductsPriceInBasket, ProductsAmountInBasket } from '../../utils/helper';
import { BasketContext } from '../../App';
import { EURO_SYMBOL } from '../../utils/data';

// interface HeaderProps {JSX: Element;}
// const Header: FC<HeaderProps> = () => (
const Header = () => {
  const { basketState } = useContext(BasketContext);

  return (
    <div className='header__wrapper'>
      <header className='header'>
        <Link className='logo' to='/'>
          Online Store
        </Link>
        <div className='cart__total'>
          Cart total: {EURO_SYMBOL}{' '}
          {new Intl.NumberFormat('ru-RU').format(ProductsPriceInBasket(basketState))}
        </div>
        <Link className='logo__basket' to='/basket'>
          <span className='logo__basket-sum'>{ProductsAmountInBasket(basketState)}</span>
        </Link>
      </header>
    </div>
  );
};

export default Header;
