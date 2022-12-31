import { AppStateBasket } from '../hooks/basketReducer';
import { products } from './data';

export function productsAmountInBasket(basketState: AppStateBasket[]): number {
  return basketState?.reduce((total: number, cur: AppStateBasket) => total + cur.quantity, 0);
}

export function productsPriceInBasket(basketState: AppStateBasket[]): number {
  return basketState?.reduce((total: number, cur: AppStateBasket): number => {
    const productObject = products?.find((product) => product.id === cur.id);

    total += productObject ? productObject?.price * cur?.quantity : 0;

    return total;
  }, 0);
}

export function itemPriceInBasket(productItem: AppStateBasket | undefined): number {
  if (productItem) {
    const productObject = products.find((product) => product.id === productItem.id);
    return productObject ? productObject.price * productItem.quantity : 0;
  } else {
    return 0;
  }
}

export function getSumFormat(sum: number): string {
  return sum.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
}
