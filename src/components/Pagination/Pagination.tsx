import React, { FC } from 'react';
import { PREV_ARROW, NEXT_ARROW } from '../../utils/data';
import './Pagination.scss';

interface PaginationProps {
  page: number;
  pagesQuantity: number;
  productsPerPage: string;
  prevPage: () => void;
  nextPage: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  pagesQuantity,
  productsPerPage,
  prevPage,
  nextPage,
  handleChange,
}) => {
  return (
    <div className='pagination'>
      <p>items per page: </p>
      <input
        className='item-quantity'
        type='text'
        value={productsPerPage}
        onChange={handleChange}
      />
      <p>page</p>
      <button className='arrow-btn' onClick={prevPage} disabled={page === 1}>
        {PREV_ARROW}
      </button>
      <p>
        {page} of {pagesQuantity}
      </p>
      <button className='arrow-btn' onClick={nextPage} disabled={page === pagesQuantity}>
        {NEXT_ARROW}
      </button>
    </div>
  );
};

export default Pagination;
