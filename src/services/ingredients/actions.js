import { sendRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    sendRequest("/ingredients")
      .then((data) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data.data,
        })
      )
      .catch((e) => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
};
