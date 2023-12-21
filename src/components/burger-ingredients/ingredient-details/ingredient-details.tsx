import React from "react";

import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";

import { TBurgerProducts } from "../../../utils/types";
import { useSelector } from "../../../services/reducer";

const IngredientDetails = (): JSX.Element => {
  const { INGREDIENTS_DATA } = useSelector((store) => store.ingredients);
  const { ingredientId } = useParams();

  const ingredient = INGREDIENTS_DATA.find(
    (el: TBurgerProducts) => el._id === ingredientId
  );

  return (
    <div className={ingredientDetailsStyles.card}>
      {ingredient && (
        <>
          <img
            src={ingredient.image_large}
            alt={ingredient.name}
            className={ingredientDetailsStyles.image}
          />
          <p className={ingredientDetailsStyles.title}>{ingredient.name}</p>
          <div className={ingredientDetailsStyles.nutrition_values}>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className={ingredientDetailsStyles.nutrient_name}>
                Калории,ккал
              </p>
              <p className={ingredientDetailsStyles.nutrient_value}>
                {ingredient.calories}
              </p>
            </div>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className={ingredientDetailsStyles.nutrient_name}>Белки, г</p>
              <p className={ingredientDetailsStyles.nutrient_value}>
                {ingredient.proteins}
              </p>
            </div>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className={ingredientDetailsStyles.nutrient_name}>Жиры, г</p>
              <p className={ingredientDetailsStyles.nutrient_value}>
                {ingredient.fat}
              </p>
            </div>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className={ingredientDetailsStyles.nutrient_name}>
                Углеводы, г
              </p>
              <p className={ingredientDetailsStyles.nutrient_value}>
                {ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { IngredientDetails };
