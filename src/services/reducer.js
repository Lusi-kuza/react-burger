import { combineReducers } from "redux";
import { constructorReducer } from "./constructor-Ingredients/reducer";
import { currentIngredientReducer } from "./current-ingredient/reducer";
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "./order/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructorIngredients: constructorReducer,
  currentIngredient: currentIngredientReducer,
});
