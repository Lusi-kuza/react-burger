import React from "react";
import ingredientIconStyle from "./ingredient-icon.module.css";

type TIngredientIconProps = {
  image: string;
  hiddenIngredient?: number | null;
};

const IngredientIcon = ({
  image,
  hiddenIngredient,
}: TIngredientIconProps): JSX.Element => {
  return (
    <div className={ingredientIconStyle.icon}>
      <img className={ingredientIconStyle.img} src={image} alt="ingredient" />
      {hiddenIngredient && (
        <div className={ingredientIconStyle.overlay_icon}>
          <p className={ingredientIconStyle.count}> {`+${hiddenIngredient}`}</p>
        </div>
      )}
    </div>
  );
};

export { IngredientIcon };
