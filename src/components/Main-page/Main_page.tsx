import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { EURO_SYMBOL, products } from '../../utils/data';
import { Product } from '../../utils/types';
import DualSlider from '../Dual-slider/Dual-slider';
import FilterCategory from '../Filter-category/Filter-category';
import ProductGrid from '../Product-grid/Product-grid';
import SearchFilterService from '../service/FilterService/FilterService';
import './Main_page.scss';

const CATEGORIES: string[] = Array.from(new Set(products.map((el) => el?.category)));

const BRAND = Array.from(new Set(products.map(({ brand }) => brand)));

const maxPriceProducts: Product = products.reduce((acc, curr) =>
  acc.price > curr.price ? acc : curr
);
const minPriceProducts: Product = products.reduce((acc, curr) =>
  acc.price < curr.price ? acc : curr
);
const maxStockProducts: Product = products.reduce((acc, curr) =>
  acc.stock > curr.stock ? acc : curr
);
const minStockProducts: Product = products.reduce((acc, curr) =>
  acc.stock < curr.stock ? acc : curr
);

function Main_page(): JSX.Element {
  const [productCard] = useState(products);
  const [priceMin, setPriceMin] = useState(10);
  const [priceMax, setPriceMax] = useState(1749);
  const [stockMin, setStockMin] = useState(2);
  const [stockMax, setStockMax] = useState(150);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearch, valueInput } = useSearch();
  const filterCategory = searchParams.get('category')?.split(',') || [];
  const filterBrand = searchParams.get('brand')?.split(',') || [];
  const sortProduct = searchParams.get('sort') || '0';

  // const dualFilterMin = searchParams.get('price')?.split(',') || [];

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
  const list = [
    ' .....',
    ' Sort by price ASC',
    ' Sort by price DESK',
    ' Sort by discount ASC',
    ' Sort by discount DESC',
  ];

  const onClickListItem = (i: string) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, sort: String(i) });
    setOpen(false);
  };

  const sortOptionsCard: Product[] = useMemo(() => {
    switch (sortProduct) {
      case '1': {
        return filteredCardBySearch.sort((a, b) => a.price - b.price);
        break;
      }
      case '2': {
        return filteredCardBySearch.sort((a, b) => b.price - a.price);
        break;
      }
      case '3': {
        return filteredCardBySearch.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      }
      case '4': {
        return filteredCardBySearch.sort((a, b) => a.discountPercentage - b.discountPercentage);
        break;
      }
      default: {
        return filteredCardBySearch;
        break;
      }
    }
  }, [sortProduct, JSON.stringify(filteredCardBySearch)]);

  const minPriceProduct: Product = useMemo(
    () => [...sortOptionsCard].sort((a, b) => a.price - b.price)[0],
    [JSON.stringify(sortOptionsCard)]
  );
  const maxPriceProduct: Product = useMemo(
    () => [...sortOptionsCard].sort((a, b) => b.price - a.price)[0],
    [JSON.stringify(sortOptionsCard)]
  );

  const minStockProduct: Product = useMemo(
    () => [...sortOptionsCard].sort((a, b) => a.stock - b.stock)[0],
    [JSON.stringify(sortOptionsCard)]
  );
  const maxStockProduct: Product = useMemo(
    () => [...sortOptionsCard].sort((a, b) => b.stock - a.stock)[0],
    [JSON.stringify(sortOptionsCard)]
  );

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

  const gridBigSmall = !!searchParams.get('big');

  const [isBigSize, setBigSize] = useState<boolean>(false);

  const ToggleClass = () => {
    const currentParams = Object.fromEntries([...searchParams]);
    setBigSize((prev) => !prev);
    if (gridBigSmall) {
      delete currentParams.big;
      setSearchParams({ ...currentParams });
    } else {
      setSearchParams({ ...currentParams, big: String(true) });
    }
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
            min={minPriceProduct?.price || priceMin}
            max={maxPriceProduct?.price || priceMax}
            totalMin={minPriceProducts.price}
            totalMax={maxPriceProducts.price}
            onChange={({ min, max }) => {
              setPriceMin(min);
              setPriceMax(max);
            }}
          />
        </div>
        <div className='dual-slider'>
          <h3>Stock</h3>
          <DualSlider
            min={minStockProduct?.stock || stockMin}
            max={maxStockProduct?.stock || stockMax}
            totalMin={minStockProducts.stock}
            totalMax={maxStockProducts.stock}
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
              <span
                onClick={() => {
                  setOpen(true);
                }}
              >
                {list[Number(sortProduct)]}
              </span>
            </div>
            {open && (
              <div className='sort__popup'>
                <ul>
                  {list.map((name, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        onClickListItem(String(i));
                      }}
                      className={Number(sortProduct) === i ? 'active' : ''}
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
                onChange={setSearch}
              />
            </form>
          </div>
          <div className='button__product-grid'>
            <button className='smallGrid' onClick={ToggleClass} disabled={!isBigSize}>
              Small
            </button>
            <button className='bigGrid' onClick={ToggleClass} disabled={isBigSize}>
              Big
            </button>
          </div>
        </div>
        <ul className={isBigSize ? 'product__grid__small' : 'product__grid'}>
          {/* <ul className='product__grid'> */}
          {sortOptionsCard.length ? (
            sortOptionsCard.map((product) => <ProductGrid key={product.id} product={product} />)
          ) : (
            <h2 className='empty-main-message'>No products found!</h2>
          )}
        </ul>
        {/* <ProductsList productCard={state.productCard} /> */}
      </div>
    </div>
  );
}
console.log(
  '1. Реализована фильтрация продуктов +30',
  '2. Реализована сортировка продуктов +20',
  '3. Реализован текстовый поиск по всем данным продуктов +15',
  '4. Реализовано переключение вида найденных продуктов +10',
  '5. Реализован роутинг с query-параметрами +10',
  '6. Реализованы кнопки сброса и копирования поиска +10',
  '7. Реализован блок кол-ва найденных товаров +5',
  '8. Поведение карточек найденных товаров +10',
  'Общая - 110/120'
);
export default Main_page;
