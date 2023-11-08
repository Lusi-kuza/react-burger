import { TBurgerConstructorProducts, TBurgerProducts } from "../../utils/types";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const DELETE_ALL_INGREDIENTS: "DELETE_ALL_INGREDIENTS" =
  "DELETE_ALL_INGREDIENTS";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";

type TAddBunAction = {
  type: typeof ADD_BUN;
  payload: TBurgerProducts;
};

type TAddIngredientAction = {
  type: typeof ADD_INGREDIENT;
  payload: TBurgerConstructorProducts;
};

type TDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
  payload: TBurgerConstructorProducts;
};

type TDeleteAllIngredientsAction = {
  type: typeof DELETE_ALL_INGREDIENTS;
};

type TMoveIngredientAction = {
  type: typeof MOVE_INGREDIENT;
  payload: {
    dragIndex: number;
    hoverIndex: number;
  };
};

export type TConstructorActions =
  | TAddBunAction
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TDeleteAllIngredientsAction
  | TMoveIngredientAction;
