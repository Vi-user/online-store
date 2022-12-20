export enum basketActionTypes {
  ADD = 'ADD_PRODUCT',
  DELETE = 'DELETE_PRODUCT',
  INCREASE = 'INCREASE_QUANTITY',
  DECREASE = 'DECREASE_QUANTITY',
}

export interface AppStateBasket {
  id: number;
  quantity: number;
}

export type BasketState = AppStateBasket[] | [];

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
      // const index = state.findIndex(el => el.id === payload);
      // state.splice(index, 1);
      return [...basketState.filter((product) => product.id !== action.payload)];
    default:
      return basketState;
  }
};
