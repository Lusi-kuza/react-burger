import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  RESET_ORDER,
} from "./actions";
import { initialState, orderReducer } from "./reducer";

describe("REDUCER --- ORDER", () => {
  const data = {
    order: 35498,
    burger: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa094a",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0949",
    ],
  };

  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should delete order and return the initial state", () => {
    const state = {
      isLoading: false,
      hasError: false,
      orderNumber: data.order,
      orderBurger: data.burger,
    };

    expect(orderReducer(state, { type: RESET_ORDER })).toEqual(initialState);
  });

  it("should return state with field isLoading: true", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual({ ...initialState, isLoading: true, hasError: false });
  });

  it("should return state with information about order", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_SUCCESS,
        payload: data,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      orderNumber: data.order,
      orderBurger: data.burger,
    });
  });

  it("should return state with field hasError: true", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_FAILED,
      })
    ).toEqual({ ...initialState, isLoading: false, hasError: true });
  });
});
