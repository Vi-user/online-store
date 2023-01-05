import React, { useState } from 'react';
import { EURO_SYMBOL, products } from '../../utils/data';
import { Product } from '../../utils/types';
import DualSlider from '../Dual-slider/Dual-slider';
import FilterCategory from '../Filter-category/Filter-category';
import ProductGrid from '../Product-grid/Product-grid';
import './Main_page.scss';
import { useSearchParams } from 'react-router-dom';

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
  // const [filterCategory, setfilterCategory] = useState<string[]>([]);
  // const [filterBrand, setfilterBrand] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [stockMin, setStockMin] = useState(0);
  const [stockMax, setStockMax] = useState(0);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamsCategory, setSearchParamsCategory] = useSearchParams();
  const [searchParamsBrand, setSearchParamsBrand] = useSearchParams();
  const filterCategory = searchParamsCategory.get('category')?.split(',') || [];
  const filterBrand = searchParamsBrand.get('brand')?.split(',') || [];

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

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const list = [
    ' .....',
    ' Sort by price ASC',
    ' Sort by price DESK',
    ' Sort by discount ASC',
    ' Sort by discount DESC',
  ];

  const onClickListItem = (i: React.SetStateAction<number>) => {
    setSelected(i);
    setOpen(false);
  };

  const sortOptionsCard: Product[] = filtererdCardbySearch.filter(() => {
    if (selected === 0) {
      return productCard;
    }
    if (selected === 1) {
      return productCard.sort((a, b) => a.price - b.price);
    }
    if (selected === 2) {
      return productCard.sort((a, b) => b.price - a.price);
    }
    if (selected === 3) {
      return productCard.sort((a, b) => a.discountPercentage - b.discountPercentage);
    }
    if (selected === 4) {
      return productCard.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }
  });

  // const maxPriceProduct: Product = useMemo(() => filtererdCardbySearch.reduce((acc, curr) =>
  // acc.price > curr.price ? acc : curr, {} as Product
  // ), [filtererdCardbySearch])

  // const minPriceProduct: Product = useMemo(() => filtererdCardbySearch.reduce((acc, curr) =>
  // acc.price < curr.price ? acc : curr, {} as Product
  // ), [filtererdCardbySearch])

  // const maxStockProduct: Product = products.reduce((acc, curr) =>
  //   acc.stock > curr.stock ? acc : curr
  // );
  // const minStockProduct: Product = products.reduce((acc, curr) =>
  //   acc.stock < curr.stock ? acc : curr
  // );

  const onClickSmallGrid = () => {};

  const setfilterCategory = (e: { target: { checked: boolean; value: string } }) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const currentParams = Object.fromEntries([...searchParamsCategory]);
    if (checked) {
      const newFilter = [...filterCategory, value].join(',');
      setSearchParamsCategory({ ...currentParams, category: newFilter });
    } else {
      const indexValue = filterCategory.indexOf(value);
      const newFilter = [
        ...filterCategory.slice(0, indexValue),
        ...filterCategory.slice(indexValue + 1),
      ].join(',');
      if (!newFilter.length) {
        delete currentParams.category;
        setSearchParamsCategory({
          ...currentParams,
        });
      } else {
        setSearchParamsCategory({ ...currentParams, category: newFilter });
      }
    }
  };

  const setfilterBrand = (e: { target: { checked: boolean; value: string } }) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const currentParams = Object.fromEntries([...searchParamsBrand]);
    console.log(currentParams);
    if (checked) {
      const newFilter = [...filterBrand, value].join(',');
      setSearchParamsBrand({ ...currentParams, brand: newFilter });
    } else {
      const indexValue = filterBrand.indexOf(value);
      const newFilter = [
        ...filterBrand.slice(0, indexValue),
        ...filterBrand.slice(indexValue + 1),
      ].join(',');
      if (!newFilter.length) {
        delete currentParams.brand;
        setSearchParamsBrand({
          ...currentParams,
        });
      } else {
        setSearchParamsBrand({ ...currentParams, brand: newFilter });
      }
    }
  };

  const handleSubmit = (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;
    const currentParams = Object.fromEntries([...searchParams]);

    setSearchParams({ ...currentParams, search: query });
    if (!query.length) {
      delete currentParams.search;
      setSearchParams({
        ...currentParams,
      });
    }
  };

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
            <FilterCategory categories={CATEGORIES} onFilterChange={setfilterCategory} />
          </div>
        </div>
        <div className='nav__brand filters'>
          <div className='category__title'>Brand</div>
          <div className='category__container'>
            <FilterCategory categories={BRAND} onFilterChange={setfilterBrand} />
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
            <span>{filtererdCardbySearch.length}</span>
          </div>
          {/* <ProductsAmountCards productCard={state.productCard} /> */}
          <div className='form'>
            <form className='search-product' onSubmit={handleSubmit}>
              <input
                type='text'
                name='search'
                placeholder='Search product...'
                className='search__input'
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          </div>
          <div className='button__product-grid'>
            <button onClick={() => onClickSmallGrid()} className='smallGrid'></button>
            <button className='bigGrid'></button>
          </div>
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
