import { combineReducers } from "redux";
import { constructorReducer } from "./constructor-Ingredients/reducer";
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "./order/reducer";
import { formReducer } from "./form/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructorIngredients: constructorReducer,
  form: formReducer,
});