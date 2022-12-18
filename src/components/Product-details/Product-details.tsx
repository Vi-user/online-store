import React, { FC, useState } from 'react';
import './Product-details.scss';
import { AppStateBasket, Product } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { changeBasketState, appState } from '../../utils/data';

interface ProductDetailsProps {
  product: Product;
}

const details = ['description', 'discountPercentage', 'rating', 'stock', 'brand', 'category'];

const ProductDetails: FC<ProductDetailsProps> = ({ product }: ProductDetailsProps) => {
  const [data, setData] = useState({ imgLink: product.images[0], index: 0 });

  const [isActiveImg, setActiveClassToImg] = useState(0);
  const classToggle = (i: number) => {
    setActiveClassToImg(i);
  };

  const [existence, setExistence] = useState(
    appState.basket.some((item: AppStateBasket) => item.id === product.id)
  );

  const viewBigSizeImg = (imgLink: string, index: number) => {
    setData({ imgLink, index });
    classToggle(index);
  };

  const changeBasket = () => {
    changeBasketState(product.id);
    setExistence(!existence);
  };

  const productImages = product.images.map((imageLink, index) => {
    return (
      <img
        key={product.id}
        src={imageLink}
        alt={product.title}
        className={`product-details__list-images 
        ${isActiveImg === index ? 'product-details__list-images_active' : ''}`}
        onClick={() => viewBigSizeImg(imageLink, index)}
      />
    );
  });

  const productDetails = details.map((detail) => {
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
            <span className='product-details__price'>&#8364; {product.price}</span>
            <button className='product-details__button' onClick={() => changeBasket()}>
              {existence ? 'Drop from cart' : 'Add to cart'}
            </button>
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
