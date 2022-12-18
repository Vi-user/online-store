import exp from "constants";

type product = Record<string, string | number | string[]>;

export interface Product extends product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface AppStateBasket {
  id: number;
  quantity: number;
}

export interface AppState {
  basket: AppStateBasket[],
}
