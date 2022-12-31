import React, { FC, useContext } from 'react';
import { AppStateBasket, basketActionTypes } from '../../hooks/basketReducer';
import { BasketContext } from '../../App';

interface ButtonProductStatusProps {
  id: number;
  type: string;
}

const ButtonProductStatus: FC<ButtonProductStatusProps> = ({
  id,
  type,
}: ButtonProductStatusProps) => {
  const { basketState, dispatch } = useContext(BasketContext);
  const isProductInBasket: boolean = basketState.map((el: AppStateBasket) => el.id).includes(id);

  return (
    <>
      {isProductInBasket ? (
        <button
          className={type}
          onClick={() => dispatch({ type: basketActionTypes.DELETE, payload: id })}
        >
          Drop from cart
        </button>
      ) : (
        <button
          className={type}
          onClick={() => dispatch({ type: basketActionTypes.ADD, payload: id })}
        >
          Add to cart
        </button>
      )}
    </>
  );
};

export default ButtonProductStatus;
