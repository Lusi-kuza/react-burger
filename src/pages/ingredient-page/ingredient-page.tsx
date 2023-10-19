import React from "react";
import ingredientPageStyle from "./ingredient-page.module.css";
import { IngredientDetails } from "../../components/burger-ingredients/ingredient-details/ingredient-details";

const IngredientPage = (): JSX.Element => {
  return (
    <div className={ingredientPageStyle.info}>
      <p className={ingredientPageStyle.title}>Детали ингредиента</p>
      <IngredientDetails />
    </div>
  );
};

export { IngredientPage };
