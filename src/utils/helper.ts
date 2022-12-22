import { AppStateBasket } from '../hooks/basketReducer';
import { products } from './data';

export function ProductsAmountInBasket(basketState: AppStateBasket[] | []): number {
  if (Object.keys(basketState).length) {
    return basketState
      .map((el: AppStateBasket) => el.quantity)
      .reduce((total: number, cur: number) => total + cur, 0);
  } else {
    return 0;
  }
}

export function ProductsPriceInBasket(basketState: AppStateBasket[] | []): number {
  if (Object.keys(basketState).length) {
    const basketItemsSums = basketState.map((el: AppStateBasket) => {
      const productObject = products.find((product) => product.id === el.id);
      return productObject ? productObject.price * el.quantity : 0;
    });
    return basketItemsSums.reduce((total: number, cur: number): number => total + cur);
  } else {
    return 0;
  }
}
