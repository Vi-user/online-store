import React, { useState } from 'react';
import { EURO_SYMBOL, products } from '../../utils/data';
import { handleFilterChangeBrand, handleFilterChangeCategory } from '../../utils/helper';
import { Product } from '../../utils/types';
import DualSlider from '../Dual-slider/Dual-slider';
import FilterCategory from '../Filter-category/Filter-category';
import ProductGrid from '../Product-grid/Product-grid';
import './Main_page.scss';

const CATEGORIES: string[] = [];
Array.from(new Set(products.map((el) => el.category))).map((category) => CATEGORIES.push(category));

const BRAND = Array.from(new Set(products.map(({ brand }) => brand)));

const maxPriceProduct: Product = products.reduce((acc, curr) =>
  acc.price > curr.price ? acc : curr
);
const minPriceProduct: Product = products.reduce((acc, curr) =>
  acc.price < curr.price ? acc : curr
);
const maxStockProduct: Product = products.reduce((acc, curr) =>
  acc.stock > curr.stock ? acc : curr
);
const minStockProduct: Product = products.reduce((acc, curr) =>
  acc.stock < curr.stock ? acc : curr
);

function Main_page(): JSX.Element {
  const [productCard] = useState(products);
  const [filterCategory, setfilterCategory] = useState<string[]>([]);
  const [filterBrand, setfilterBrand] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [stockMin, setStockMin] = useState(0);
  const [stockMax, setStockMax] = useState(0);
  const [search, setSearch] = useState('');

  const filterCardByFiltered: Product[] = filterCategory.length
    ? productCard.filter((e) => filterCategory.includes(e.category))
    : productCard;

  const filterCardByBrand: Product[] = filterBrand.length
    ? filterCardByFiltered.filter((e) => filterBrand.includes(e.brand))
    : filterCardByFiltered;

  const filterCardByPrice: Product[] = filterCardByBrand.filter(
    (e) => e.price >= priceMin && e.price <= priceMax
  );

  const filterCardByStock: Product[] = filterCardByPrice.filter(
    (e) => e.stock >= stockMin && e.stock <= stockMax
  );

  const filtererdCardbySearch: Product[] = filterCardByStock.filter((card) => {
    return (
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.brand.toLowerCase().includes(search.toLowerCase()) ||
      card.description.toLowerCase().includes(search.toLowerCase()) ||
      card.category.toLowerCase().includes(search.toLowerCase()) ||
      card.price.toString().includes(search) ||
      card.stock.toString().includes(search) ||
      card.discountPercentage.toString().includes(search) ||
      card.rating.toString().includes(search)
    );
  });

  return (
    <div className='main_page'>
      <div className='filters__panel'>
        <div className='button__top'>
          <button>Reset Filters</button>
          <button>Copy Link</button>
        </div>
        <div className='nav__category filters'>
          <div className='category__title'>Category</div>
          <div className='category__container'>
            <FilterCategory
              categories={CATEGORIES}
              onFilterChange={(e) => handleFilterChangeCategory(e, setfilterCategory)}
            />
          </div>
        </div>
        <div className='nav__brand filters'>
          <div className='category__title'>Brand</div>
          <div className='category__container'>
            <FilterCategory
              categories={BRAND}
              onFilterChange={(e) => handleFilterChangeBrand(e, setfilterBrand)}
            />
          </div>
        </div>
        <div className='dual-slider'>
          <h3>Price {EURO_SYMBOL}</h3>
          <DualSlider
            min={minPriceProduct.price}
            max={maxPriceProduct.price}
            onChange={({ min, max }) => {
              setPriceMin(min);
              setPriceMax(max);
            }}
          />
        </div>
        <div className='dual-slider'>
          <h3>Stock</h3>
          <DualSlider
            min={minStockProduct.stock}
            max={maxStockProduct.stock}
            onChange={({ min, max }) => {
              setStockMin(min);
              setStockMax(max);
            }}
          />
        </div>
      </div>
      <div className='card-product'>
        <div className='card-product__header'>
          <button>Sort by discount</button>
          <div className='found'>
            Found:
            <span>{filtererdCardbySearch.length}</span>
          </div>
          {/* <ProductsAmountCards productCard={state.productCard} /> */}
          <div className='form'>
            <form className='search-product'>
              <input
                type='text'
                placeholder='Search product...'
                className='search__input'
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          </div>
          <div className='button__product-grid'>
            <button></button>
            <button></button>
          </div>
        </div>
        <ul className='product__grid'>
          {filtererdCardbySearch.map((product) => (
            <ProductGrid key={product.id} product={product} />
          ))}
        </ul>
        {/* <ProductsList productCard={state.productCard} /> */}
      </div>
    </div>
  );
}

export default Main_page;
