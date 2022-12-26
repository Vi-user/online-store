import React, { FC } from 'react';
import './Filter-category.scss';

interface FilterCategory {
  categories: string[];
  onFilterChange: (event: { target: { checked: boolean; value: string } }) => void;
}

const FilterCategory: FC<FilterCategory> = ({ categories, onFilterChange }) => {
  return (
    <ul>
      {categories.map((category: string) => (
        <div className='filter-list' key={category}>
          <div className='category__bar'>
            <label>
              <input onChange={onFilterChange} type='checkbox' value={category} />
              {category}
            </label>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default FilterCategory;
