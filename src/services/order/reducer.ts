import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  RESET_ORDER,
  TOrderActions,
} from "./actions";

type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  orderNumber: number | null;
  orderBurger: Array<string> | null;
};

const initialState: TOrderState = {
  isLoading: false,
  hasError: false,
  orderNumber: null,
  orderBurger: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderNumber: action.payload.order,
        orderBurger: action.payload.burger,
      };
    case GET_ORDER_FAILED:
      return { ...state, isLoading: false, hasError: true };
    case RESET_ORDER:
      return initialState;
    default:
      return state;
  }
};
