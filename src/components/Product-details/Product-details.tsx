import React, { FC } from 'react';
import './Product-details.scss';
import { Product } from '../../utils/types';

interface ProductDetailsProps {
  product: Product;
}

const details = ['description', 'discountPercentage', 'rating', 'stock', 'brand', 'category'];

const ProductDetails: FC<ProductDetailsProps> = ({ product }: ProductDetailsProps) => (
  <>
    <div className='product-details__path'>
      STORE ➩ {product.category} ➩ {product.brand} ➩ {product.title}
    </div>
    <div className='product-details'>
      <h2 className='product-details__title'>{product.title}</h2>
      <div className='product-details__content'>
        <div className='product-details__images'>
          {product.images.map((imageLink) => {
            return (
              <img
                key={product.id}
                src={imageLink}
                alt={product.title}
                className='product-details__list-images'
              />
            );
          })}
        </div>
        <img
          src={product.images[0]}
          alt='product img'
          className='product-details__list-images_active'
        />
        <div className='product-details__container'>
          {details.map((detail) => {
            return (
              <div className='detail-box' key={detail}>
                <p className='detail-box__name'>{detail}:</p>
                <p className='detail-box__value'>{product[detail]}</p>
              </div>
            );
          })}
        </div>
        <div className='product-details__actions'>
          <span className='product-details__price'>&#8364; {product.price}</span>
          <button className='product-details__button'>Add to cart</button>
          <button className='product-details__button'>Buy now</button>
        </div>
      </div>
    </div>
  </>
);

export default ProductDetails;
