import React from 'react';
import { Product } from '../../utils/types';
import ProductGrid from '../Product-grid/Product-grid';

function ProductsList(props: { productCard: Product[] }) {
  const { productCard } = props;
  return (
    <ul className='product__grid'>
      {productCard.map((product) => (
        <ProductGrid key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductsList;
