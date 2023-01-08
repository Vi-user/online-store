import React, { useMemo, useState } from 'react';
import { EURO_SYMBOL, products } from '../../utils/data';
import { Product } from '../../utils/types';
import DualSlider from '../Dual-slider/Dual-slider';
import FilterCategory from '../Filter-category/Filter-category';
import ProductGrid from '../Product-grid/Product-grid';
import './Main_page.scss';
import { useSearchParams } from 'react-router-dom';
import SearchFilterService from '../service/FilterService/FilterService';

const CATEGORIES: string[] = Array.from(new Set(products.map((el) => el?.category)));

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

function Main_page() {
  const [productCard] = useState(products);
  // const [filterCategory, setFilterCategory] = useState<string[]>([]);
  // const [filterBrand, setFilterBrand] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [stockMin, setStockMin] = useState(0);
  const [stockMax, setStockMax] = useState(0);
  // const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchParamsCategory, setSearchParamsCategory] = useSearchParams();
  // const [searchParamsBrand, setSearchParamsBrand] = useSearchParams();
  const filterCategory = searchParams.get('category')?.split(',') || [];
  const filterBrand = searchParams.get('brand')?.split(',') || [];
  const valueInput = searchParams.get('value') || '';
  const sortProduct = searchParams.get('sort') || '';

  const filterCardByFiltered: Product[] = filterCategory.length
    ? productCard.filter((e: Product) => filterCategory.includes(e.category))
    : productCard;

  const filterCardByBrand: Product[] = filterBrand.length
    ? filterCardByFiltered.filter((e: Product) => filterBrand.includes(e.brand))
    : filterCardByFiltered;

  const filterCardByPrice: Product[] = filterCardByBrand.filter(
    (e: Product) => e.price >= priceMin && e.price <= priceMax
  );

  const filterCardByStock: Product[] = filterCardByPrice.filter(
    (e: Product) => e.stock >= stockMin && e.stock <= stockMax
  );

  const filteredCardBySearch: Product[] = filterCardByStock.filter((card: Product) => {
    return (
      card.title.toLowerCase().includes(valueInput.toLowerCase()) ||
      card.brand.toLowerCase().includes(valueInput.toLowerCase()) ||
      card.description.toLowerCase().includes(valueInput.toLowerCase()) ||
      card.category.toLowerCase().includes(valueInput.toLowerCase()) ||
      card.price.toString().includes(valueInput) ||
      card.stock.toString().includes(valueInput) ||
      card.discountPercentage.toString().includes(valueInput) ||
      card.rating.toString().includes(valueInput)
    );
  });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const list = [
    ' .....',
    ' Sort by price ASC',
    ' Sort by price DESK',
    ' Sort by discount ASC',
    ' Sort by discount DESC',
  ];

  const onClickListItem = (i: number) => {
    setSelected(i);
    setOpen(false);
  };

  const sortOptionsCard: Product[] = useMemo(() => {
    if (selected === 1) {
      return filteredCardBySearch.sort((a, b) => a.price - b.price);
    } else if (selected === 2) {
      return filteredCardBySearch.sort((a, b) => b.price - a.price);
    } else if (selected === 3) {
      return filteredCardBySearch.sort((a, b) => a.discountPercentage - b.discountPercentage);
    } else if (selected === 4) {
      return filteredCardBySearch.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else {
      return filteredCardBySearch;
    }
  }, [selected, filteredCardBySearch]);

  // const minPriceProduct: Product = useMemo(() => [...sortOptionsCard].sort((a, b) => a.price - b.price)[0], [JSON.stringify(sortOptionsCard)]);
  // const maxPriceProduct: Product = useMemo(() => [...sortOptionsCard].sort((a, b) => b.price - a.price)[0], [JSON.stringify(sortOptionsCard)]);

  // const maxPriceProduct: Product = useMemo(() => filteredCardBySearch.reduce((acc, curr) =>
  // acc.price > curr.price ? acc : curr, {} as Product
  // ), [filteredCardBySearch])

  // const maxStockProduct: Product = products.reduce((acc, curr) =>
  //   acc.stock > curr.stock ? acc : curr
  // );
  // const minStockProduct: Product = products.reduce((acc, curr) =>
  //   acc.stock < curr.stock ? acc : curr
  // );

  // const onClickSmallGrid = () => {};

  const setFilterCategory = (e: { target: { checked: boolean; value: string } }) => {
    const { checked, value } = e.target;

    const newSearchParamsCategory = SearchFilterService.searchByParams(
      checked,
      value,
      'category',
      searchParams,
      filterCategory
    );
    setSearchParams(newSearchParamsCategory);
  };

  const setFilterBrand = (e: { target: { checked: boolean; value: string } }) => {
    const { checked, value } = e.target;
    const newSearchParamsCategory = SearchFilterService.searchByParams(
      checked,
      value,
      'brand', //TODO
      searchParams,
      filterBrand
    );

    setSearchParams(newSearchParamsCategory);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //TODO debounce

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // setSearch(value);

    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, value });

    if (!value) {
      delete currentParams.value;
      setSearchParams({
        ...currentParams,
      });
    }
  };

  const [copied, setCopied] = useState(false);

  function copy(): void {
    const el: HTMLInputElement = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  const resetFilters = () => {
    setSearchParams();
  };

  return (
    <div className='main_page'>
      <div className='filters__panel'>
        <div className='button__top'>
          <button onClick={resetFilters}>Reset Filters</button>
          <button onClick={copy}>{!copied ? 'Copy link' : 'Copied!'}</button>
        </div>
        <div className='nav__category filters'>
          <div className='category__title'>Category</div>
          <div className='category__container'>
            <FilterCategory
              categories={CATEGORIES}
              onFilterChange={setFilterCategory}
              filterArray={filterCategory}
            />
          </div>
        </div>
        <div className='nav__brand filters'>
          <div className='category__title'>Brand</div>
          <div className='category__container'>
            <FilterCategory
              categories={BRAND}
              onFilterChange={setFilterBrand}
              filterArray={filterBrand}
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
          {/* <Sort value={sortType} onClickCategory={(i: React.SetStateAction<number>) => setSortType(i)}/> */}

          <div className='sort'>
            <div className='sort__label'>
              <b>Sort options: </b>
              <span onClick={() => setOpen(!open)}>{list[selected]}</span>
            </div>
            {open && (
              <div className='sort__popup'>
                <ul>
                  {list.map((name, i) => (
                    <li
                      key={i}
                      onClick={() => onClickListItem(i)}
                      className={selected === i ? 'active' : ''}
                      value={sortProduct}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className='found'>
            Found:
            <span>{filteredCardBySearch.length}</span>
          </div>
          {/* <ProductsAmountCards productCard={state.productCard} /> */}
          <div className='form'>
            <form className='search-product' onSubmit={handleSubmit}>
              <input
                type='text'
                name='search'
                placeholder='Search product...'
                className='search__input'
                value={valueInput}
                onChange={handleInputChange}
              />
            </form>
          </div>
          {/* <div className='button__product-grid'>
            <button onClick={() => onClickSmallGrid()} className='smallGrid'></button>
            <button className='bigGrid'></button>
          </div> */}
        </div>
        <ul className='product__grid'>
          {sortOptionsCard.map((product) => (
            <ProductGrid key={product.id} product={product} />
          ))}
        </ul>
        {/* <ProductsList productCard={state.productCard} /> */}
      </div>
    </div>
  );
}

export default Main_page;
