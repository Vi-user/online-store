import React, { useCallback, useState } from 'react';
import { products } from '../../utils/data';
import { Product } from '../../utils/types';
import FilterCategory from '../Filter-category/Filter-category';
import './Main_page.scss';
import ProductsList from './Prodcuts-list';
import ProductsAmountCards from './Products-amount';

const CATEGORIES: string[] = [];
Array.from(new Set(products.map((el) => el.category))).map((category) => CATEGORIES.push(category));

function Main_page() {
  const [state, setState] = useState({
    productCard: products,
    filters: new Set(),
  });

  const handleFilterChange = useCallback(
    (event: { target: { checked: boolean; value: string } }) => {
      setState((previousState) => {
        const filters = new Set(previousState.filters);
        let productCard: Product[] = products!;

        if (event.target.checked) {
          filters.add(event.target.value);
        } else {
          filters.delete(event.target.value);
        }

        if (filters.size) {
          productCard = productCard.filter((product) => {
            return filters.has(product.category);
          });
        }

        return {
          filters,
          productCard,
        };
      });
    },
    [setState]
  );

  return (
    <div className='main_page'>
      <div className='filters__panel'>
        <div className='button__top'>
          <button>Reset Filters</button>
          <button>Copy Link</button>
        </div>
        <div className='nav__category'>
          <div className='category__title'>Category</div>
          <div className='category__container'>
            <FilterCategory categories={CATEGORIES} onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className='nav__brand'></div>
        <div className='dual-slider__price'></div>
        <div className='dual-slider__stock'></div>
      </div>
      <div className='card-product'>
        <div className='card-product__header'>
          <button>Sort by discount</button>
          <ProductsAmountCards productCard={state.productCard} />
          <div className='search-product'></div>
          <div className='button__product-grid'>
            <button></button>
            <button></button>
          </div>
        </div>
        <ProductsList productCard={state.productCard} />
      </div>
    </div>
  );
}

export default Main_page;
