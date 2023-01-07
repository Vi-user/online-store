import React, { FC } from 'react';
import './Product-grid.scss';
import { Product } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import ButtonProductStatus from '../Button-product-status/Button-product-status';

interface ProductGridProps {
  product: Product;
}

const ProductGrid: FC<ProductGridProps> = ({ product }: ProductGridProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='product__card'>
        <div className='product__item'>
          <img className='product__item' src={product.thumbnail} alt={product.title} onClick={() => navigate(`/product/${product.id}`)}/>
          <div className='product__text'>
            <div className='product__title' onClick={() => navigate(`/product/${product.id}`)}>{product.title}</div>
          </div>
          <div className='product__buttons'>
            <ButtonProductStatus id={Number(product.id)} type={''} />
            <button onClick={() => navigate(`/product/${product.id}`)}>Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
