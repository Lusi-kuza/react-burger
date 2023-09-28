import { sendRequest } from "../../utils/burger-api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const RESET_ORDER = "RESET_ORDER";

export const getOrder = (dataSend) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    sendRequest("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: dataSend,
      }),
    })
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
