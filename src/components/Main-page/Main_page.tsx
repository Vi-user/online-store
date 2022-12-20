import React from 'react';
import { products } from '../../utils/data';
import ProductGrid from '../Product-grid/Product-grid';
import './Main_page.scss';

const cards: JSX.Element[] = products.map((item) => <ProductGrid key={item.id} product={item} />);

const Main_page = (): JSX.Element => (
  <div className='main_page'>
    <div className='navBar'>
      <div className='button__top'>
        <button>Reset Filters</button>
        <button>Copy Link</button>
      </div>
      <div className='nav__category'>
        <div className='category__title'>Category</div>
        <div>filter</div>
      </div>
      <div className='nav__brand'></div>
      <div className='dual-slider__price'></div>
      <div className='dual-slider__stock'></div>
    </div>
    <div className='card-product'>
      <div className='card-product__header'>
        <button>Sort by discount</button>
        <div className='found'>
          Found:
          <span>0</span>
        </div>
        <div className='search-product'></div>
        <div className='button__product-grid'>
          <button></button>
          <button></button>
        </div>
      </div>
      <div className='product__grid'>{cards}</div>
      <div></div>
    </div>
  </div>
);

export default Main_page;
