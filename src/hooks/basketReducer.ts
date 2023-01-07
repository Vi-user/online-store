export enum basketActionTypes {
  ADD = 'ADD_PRODUCT',
  DELETE = 'DELETE_PRODUCT',
  INCREASE = 'INCREASE_QUANTITY',
  DECREASE = 'DECREASE_QUANTITY',
  RESET = 'RESET_STATE',
}

export interface AppStateBasket {
  id: number;
  quantity: number;
}

export type BasketState = AppStateBasket[];

export const initState: BasketState = [];

export const initBasket = (initValue: BasketState = initState) => {
  const basketJSON = localStorage.getItem('basketState');
  return typeof basketJSON === 'string' ? JSON.parse(basketJSON) : initValue;
};

export type actionType = {
  type: basketActionTypes;
  payload: number;
};

export const basketReducer = (basketState: [] | AppStateBasket[], action: actionType) => {
  switch (action.type) {
    case basketActionTypes.ADD:
      return [
        ...basketState,
        {
          id: action.payload,
          quantity: 1,
        },
      ];
    case basketActionTypes.DELETE:
      return basketState.filter((product) => product.id !== action.payload);
    case basketActionTypes.INCREASE:
      return basketState.map((product) => {
        if (product.id === action.payload) {
          product.quantity++;
        }
        return product;
      });
    case basketActionTypes.DECREASE:
      return basketState.map((product) => {
        if (product.id === action.payload) {
          product.quantity--;
        }
        return product;
      });
    case basketActionTypes.RESET:
      return initState;
    default:
      return basketState;
  }
};
