import React, { FC } from 'react';
import { products } from '../../utils/data';
import ProductGrid from '../Product-grid/Product-grid';
import './Filter-category.scss';

const FilterCategory = (props: any) => {  
  return (
    <div className='filter-list'>
      <div className='category__bar'>
        <input type='checkbox' id='smart' />
        <label htmlFor='smart' onClick={props.onClickFilter}>
          {props.category}
          </label>
        <span>5/5</span>
      </div>
    </div>
  );
};

export default FilterCategory;