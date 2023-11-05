import React, { useMemo } from "react";
import burgerCategoryStyle from "./burger-category.module.css";
import { BurgerCard } from "./burger-card/burger-card";

import {
  TBurgerCategory,
  TBurgerConstructorProducts,
} from "../../../utils/types";
import { useSelector } from "../../../services/reducer";

type TBurgerCategoryProps = {
  ingredients: TBurgerCategory;
};

const BurgerCategory = React.memo(
  ({ ingredients }: TBurgerCategoryProps): JSX.Element => {
    const { bun, ingredient } = useSelector(
      (store) => store.constructorIngredients
    );

    const countIngredient = useMemo(() => {
      let count = null;
      if (bun && ingredients.idCategory === 1) {
        count = {
          [bun._id]: 2,
        };
      }
      let countI = ingredient.reduce(
        (res: { [key: string]: number }, el: TBurgerConstructorProducts) =>
          Object.keys(res).includes(el._id)
            ? { ...res, [el._id]: ++res[el._id] }
            : { ...res, [el._id]: 1 },
        {}
      );

      count = { ...count, ...countI };
      return count;
    }, [bun, ingredient, ingredients.idCategory]);

    return (
      <div>
        <section className="pb-10" ref={ingredients.categoryRef}>
          <h2 className="text_type_main-medium mb-6">
            {ingredients.nameCategory}
          </h2>
          <ul className={`${burgerCategoryStyle.list} pl-4 `}>
            {ingredients.products.map((item) => (
              <li key={item._id} className={burgerCategoryStyle.item}>
                <BurgerCard
                  ingredient={item}
                  count={
                    countIngredient &&
                    Object.keys(countIngredient).includes(item._id)
                      ? countIngredient[item._id]
                      : null
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  },
  (prevProp, nextProp) => {
    if (
      prevProp.ingredients.products.length ===
      nextProp.ingredients.products.length
    )
      return true;
    return false;
  }
);

export { BurgerCategory };
