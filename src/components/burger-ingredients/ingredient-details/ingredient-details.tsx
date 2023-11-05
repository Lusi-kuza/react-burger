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
            className="ml-5 mr-5 mb-4"
          />
          <p
            className={`${ingredientDetailsStyles.title} text_type_main-medium mb-8`}
          >
            {ingredient.name}
          </p>
          <div className={ingredientDetailsStyles.nutrition_values}>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className="text_type_main-default text_color_inactive">
                Калории,ккал
              </p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredient.calories}
              </p>
            </div>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className="text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredient.proteins}
              </p>
            </div>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className="text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredient.fat}
              </p>
            </div>
            <div className={ingredientDetailsStyles.nutrients}>
              <p className="text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p className="text_type_digits-default text_color_inactive">
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
