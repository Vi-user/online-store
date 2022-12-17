import React from 'react';
import ProductDetails from '../components/Product-details/Product-details';
import { products } from '../utils/data';

const Product = (): JSX.Element => {
  return (
    <div>
      product page
      <ProductDetails product={products.filter((el) => el.id === 88)[0]} />
    </div>
  );
};

export default Product;
