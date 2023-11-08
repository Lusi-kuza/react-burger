import { sendRequest } from "../../utils/burger-api";
import { TBurgerProducts } from "../../utils/types";
import { AppThunk } from "../reducer";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

type TGetIngredientsRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: Array<TBurgerProducts>;
};

type TGetIngredientsFailedAction = {
  type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;

export const getIngredients = (): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    sendRequest("/ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
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
