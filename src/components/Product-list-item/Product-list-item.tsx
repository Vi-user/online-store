import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../utils/types';
import { AppStateBasket } from '../../hooks/basketReducer';
import { itemPriceInBasket } from '../../utils/helper';
import './Product-list-item.scss';

interface ProductListItemProps {
  product: Product;
  index: number;
  startIndexOfPage: number;
  isAvailableMinimum: (id: number) => void;
  isEnoughInStock: (id: number) => void;
  getQuantityInBasket: (id: number) => number;
  basketObj: AppStateBasket;
}

const ProductListItem: FC<ProductListItemProps> = ({
  product,
  index,
  startIndexOfPage,
  isAvailableMinimum,
  isEnoughInStock,
  getQuantityInBasket,
  basketObj,
}) => {
  const navigate = useNavigate();
  return (
    <li className='product-list-item'>
      <span className='product-list-item__index'>{startIndexOfPage + index + 1}</span>
      <img
        className='product-list-item__photo'
        src={product.images[0]}
        alt={`${product.title} image`}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <div className='product-list-item__box' onClick={() => navigate(`/product/${product.id}`)}>
        <h3 className='product-list-item__title'>{product.title}</h3>
        <h3 className='product-list-item__description'>{product.description}</h3>
        <div className='product-list-item__rating-discount'>
          <span className='product-list-item__rating'>Rating: {product.rating}</span>
          <span className='product-list-item__discount'>
            Discount: {product.discountPercentage}
          </span>
        </div>
      </div>
      <div className='product-list-item__stock-price'>
        <div className='product-list-item__stock'>Stock: {product.stock}</div>
        <div className='product-list-item__quantity'>
          <button className='change-quantity' onClick={() => isAvailableMinimum(product.id)}>
            -
          </button>
          <span>{getQuantityInBasket(product.id)}</span>
          <button className='change-quantity' onClick={() => isEnoughInStock(product.id)}>
            +
          </button>
        </div>
        <div className='product-list-item__price'>
          {itemPriceInBasket(basketObj).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          })}
        </div>
      </div>
    </li>
  );
};

export default ProductListItem;
