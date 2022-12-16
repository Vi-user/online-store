import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

// interface HeaderProps {JSX: Element;}
// const Header: FC<HeaderProps> = () => (
const Header = () => (
  <div className='header__wrapper'>
    <header className='header'>
      <Link className='logo' to='/'>
        Online Store
      </Link>
      <div className='cart__total'>
        Cart total:
        <span>0</span>
      </div>
      <Link className='logo__basket' to='/basket'></Link>
    </header>
  </div>
);

export default Header;
