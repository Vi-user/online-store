import React, { FC } from 'react';
import './Product-grid.scss';
import { Product } from '../../utils/types';

interface ProductGridProps {
  product: Product;
}

const ProductGrid: FC<ProductGridProps> = ({ product }: ProductGridProps) => (
  <>
    <div className='product__card'>
      <div className='product__item'>
        <img
          className='product__item'
          src={product.thumbnail}
          alt={product.title}
          onClick={() => {
            window.location.assign('http://localhost:3000/product/' + product.id);
          }}
        />
        <div className='product__text'>
          <div className='product__title'>{product.title}</div>
        </div>
        <div className='product__buttons'>
          <button>Add to cart</button>
          <button>Datails</button>
        </div>
      </div>
    </div>
  </>
);

export default ProductGrid;
