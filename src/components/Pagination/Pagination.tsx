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
  handleClickPage: (p: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  pagesQuantity,
  productsPerPage,
  prevPage,
  nextPage,
  handleChange,
  handleClickPage,
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
      <button
        className='arrow-btn'
        onClick={() => {
          prevPage();
          handleClickPage(page - 1);
        }}
        disabled={page === 1}
      >
        {PREV_ARROW}
      </button>
      <p>
        {page} of {pagesQuantity}
      </p>
      <button
        className='arrow-btn'
        onClick={() => {
          nextPage();
          handleClickPage(page + 1);
        }}
        disabled={page === pagesQuantity}
      >
        {NEXT_ARROW}
      </button>
    </div>
  );
};

export default Pagination;
