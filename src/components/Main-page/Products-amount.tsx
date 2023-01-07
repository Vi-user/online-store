import React from 'react';
import { Product } from '../../utils/types';

function ProductsAmountCards(props: { productCard: Product[] }) {
  const { productCard } = props;
  return (
    <div className='found'>
      Found:
      <span>{productCard.length}</span>
    </div>
  );
}

export default ProductsAmountCards;
