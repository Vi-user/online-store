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

export function itemPriceInBasket(productItem: AppStateBasket | undefined): number {
  if (productItem) {
    const productObject = products.find((product) => product.id === productItem.id);
    return productObject ? productObject.price * productItem.quantity : 0;
  } else {
    return 0;
  }
}

export function handleFilterChangeCategory(
  e: { target: { checked: boolean; value: string } },
  setfilterCategory: React.Dispatch<React.SetStateAction<string[]>>
) {
  setfilterCategory((previousState) => {
    return e.target.checked
      ? [...previousState, e.target.value]
      : previousState.filter((v) => v !== e.target.value);
  });
}

export function handleFilterChangeBrand(
  e: { target: { checked: boolean; value: string } },
  setfilterBrand: React.Dispatch<React.SetStateAction<string[]>>
) {
  setfilterBrand((previousState) => {
    return e.target.checked
      ? [...previousState, e.target.value]
      : previousState.filter((v) => v !== e.target.value);
  });
}
