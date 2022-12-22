import React, { useContext, useState } from 'react';
import './Product-details.scss';
import { Product } from '../../utils/types';
import { EURO_SYMBOL, products } from '../../utils/data';
import { useNavigate, useParams } from 'react-router-dom';
import { BasketContext } from '../../App';
import { basketActionTypes } from '../../hooks/basketReducer';

const details: string[] = [
  'description',
  'discountPercentage',
  'rating',
  'stock',
  'brand',
  'category',
];

const ProductDetails = () => {
  const { id } = useParams();
  const product: Product = products.filter((el) => el.id === Number(id))[0];

  const { basketState, dispatch } = useContext(BasketContext);

  const [data, setData] = useState({ imgLink: product.images[0], index: 0 });

  const [isActiveImg, setActiveClassToImg] = useState(0);
  const classToggle = (i: number) => {
    setActiveClassToImg(i);
  };

  const viewBigSizeImg = (imgLink: string, index: number) => {
    setData({ imgLink, index });
    classToggle(index);
  };

  const isProductInBasket: boolean = basketState.map((el) => el.id).includes(product.id);

  const productImages: JSX.Element[] = product.images.map((imageLink, index) => {
    return (
      <img
        key={product.images[index]}
        src={imageLink}
        alt={product.title}
        className={`product-details__list-images 
        ${isActiveImg === index ? 'product-details__list-images_active' : ''}`}
        onClick={() => viewBigSizeImg(imageLink, index)}
      />
    );
  });

  const productDetails: JSX.Element[] = details.map((detail) => {
    return (
      <div className='detail-box' key={detail}>
        <p className='detail-box__name'>{detail}:</p>
        <p className='detail-box__value'>{product[detail]}</p>
      </div>
    );
  });

  const navigate = useNavigate();

  return (
    <>
      <div className='product-details__path'>
        STORE ➩ {product.category} ➩ {product.brand} ➩ {product.title}
      </div>
      <div className='product-details'>
        <h2 className='product-details__title'>{product.title}</h2>
        <div className='product-details__content'>
          <div className='product-details__images'>{productImages}</div>
          <img src={data.imgLink} alt='product img' className='product-details__big-img' />
          <div className='product-details__container'>{productDetails}</div>
          <div className='product-details__actions'>
            <span className='product-details__price'>
              {EURO_SYMBOL} {product.price}
            </span>
            {!isProductInBasket && (
              <button
                className='product-details__button'
                onClick={() => dispatch({ type: basketActionTypes.ADD, payload: product.id })}
              >
                ADD
              </button>
            )}
            {isProductInBasket && (
              <button
                className='product-details__button'
                onClick={() => dispatch({ type: basketActionTypes.DELETE, payload: product.id })}
              >
                DROP
              </button>
            )}
            <button className='product-details__button' onClick={() => navigate('/basket')}>
              Buy now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
