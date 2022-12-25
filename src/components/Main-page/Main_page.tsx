import React from 'react';
import { products } from '../../utils/data';
import { Product } from '../../utils/types';
import FilterCategory from '../Filter-category/Filter-category';
import ProductGrid from '../Product-grid/Product-grid';
import './Main_page.scss';

let cards = products.map((item) => <ProductGrid key={item.id} product={item} />);

const filterCatgory= Array.from(new Set(products.map((el) => el.category))).map((category) => (
  <FilterCategory onClickFilter={() => {console.log('categ', category)}} key={category} category={category} />
));

// console.log(cards[0].props.product.category)
// console.log(filterCatgory[0].props.category)

// cards.map((el) => console.log(el.props.product.category))
// filterCatgory.map((el) => (el.props.category))

const Main_page = (): JSX.Element => {

  const [countCards, setCount] = React.useState(cards)
  console.log(countCards[0].props.product.category)
  
  const filterCardsCategory = () => {
    
  }

  return (
    <div className='main_page'>
      <div className='filters__panel'>
        <div className='button__top'>
          <button>Reset Filters</button>
          <button>Copy Link</button>
        </div>
        <div className='nav__category'>
          <div className='category__title'>Category</div>
          <div className='category__container'>{filterCatgory}</div>
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
            <span>{cards.length}</span>
          </div>
          <div className='search-product'></div>
          <div className='button__product-grid'>
            <button></button>
            <button></button>
          </div>
        </div>
        <div className='product__grid'>{countCards}</div>
      </div>
    </div>
  )
};

export default Main_page;
