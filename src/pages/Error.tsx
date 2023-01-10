import React from 'react';
import './Error.scss';
import { Link } from 'react-router-dom';

const ErrorPage = (): JSX.Element => {
  return (
    <div className='error-page__container'>
      <h2 className='error-page__error-code'>404</h2>
      <p className='error-page__message'>this page does not exist</p>
      <Link to='/'>
        <span className='error-page__button'>Back to main page</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
