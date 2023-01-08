import React, { FC } from 'react';
import './Filter-category.scss';

interface FilterCategory {
  categories: string[];
  onFilterChange: (event: { target: { checked: boolean; value: string } }) => void;
  filterArray: string[];
}

const FilterCategory: FC<FilterCategory> = ({ categories, onFilterChange, filterArray }) => {
  return (
    <ul>
      {categories.map((category: string) => (
        <div className='filter-list' key={category}>
          <div className='category__bar'>
            <label>
              <input
                onChange={onFilterChange}
                type='checkbox'
                value={category}
                checked={filterArray.includes(category)}
              />
              {category}
            </label>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default FilterCategory;
