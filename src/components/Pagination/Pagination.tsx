import React, { FC } from 'react';
import { PREV_ARROW, NEXT_ARROW } from '../../utils/data';
import './Pagination.scss';

interface PaginationProps {
  page: number;
  productsPerPage: number;
  prevPage: () => void;
  nextPage: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
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
        type='number'
        value={productsPerPage}
        onChange={handleChange}
        pattern='^[0-9]'
      />
      <p>page</p>
      <span className='arrow-btn' onClick={prevPage}>
        {PREV_ARROW}
      </span>
      <p>{page}</p>
      <span className='arrow-btn' onClick={nextPage}>
        {NEXT_ARROW}
      </span>
    </div>
  );
};

export default Pagination;
