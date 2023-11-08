import { TBurgerConstructorProducts, TBurgerProducts } from "../../utils/types";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  TConstructorActions,
} from "./actions";

type TConstructorState = {
  bun: TBurgerProducts | null;
  ingredient: Array<TBurgerConstructorProducts>;
};

const initialState: TConstructorState = {
  bun: null,
  ingredient: [],
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case ADD_BUN:
      return { ...state, bun: action.payload };
    case ADD_INGREDIENT:
      return { ...state, ingredient: [...state.ingredient, action.payload] };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredient: state.ingredient.filter((item) => item !== action.payload),
      };

    case MOVE_INGREDIENT:
      const dragItem = state.ingredient[action.payload.dragIndex];
      const hoverItem = state.ingredient[action.payload.hoverIndex];
      const updatedIngredient = { ...state };
      updatedIngredient.ingredient[action.payload.dragIndex] = hoverItem;
      updatedIngredient.ingredient[action.payload.hoverIndex] = dragItem;
      return updatedIngredient;

    case DELETE_ALL_INGREDIENTS:
      return initialState;

    default:
      return state;
  }
};
