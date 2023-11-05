import { getOrderRequest } from "../../utils/burger-api";
import { AppThunk } from "../reducer";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

type TGetOderRequestAction = {
  type: typeof GET_ORDER_REQUEST;
};

type TGetOderSuccessAction = {
  type: typeof GET_ORDER_SUCCESS;
  payload: { order: number; burger: Array<string> };
};

type TGetOderFailedAction = {
  type: typeof GET_ORDER_FAILED;
};

type TResetOrderAction = {
  type: typeof RESET_ORDER;
};

export type TOrderActions =
  | TGetOderRequestAction
  | TGetOderSuccessAction
  | TGetOderFailedAction
  | TResetOrderAction;

export const getOrder = (dataSend: Array<string>): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderRequest(dataSend)
      .then((data) =>
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: { order: data.order.number, burger: dataSend },
        })
      )
      .catch((e) => {
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
};
