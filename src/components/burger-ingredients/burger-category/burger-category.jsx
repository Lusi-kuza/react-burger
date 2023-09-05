import React from "react";
import burgerCategoryStyle from "./burger-category.module.css";
import { BurgerCard } from "./burger-card/burger-card";
import { burgerCategoryPropTypes } from "../../../utils/types";

const BurgerCategory = ({ ingredients, openCard }) => {
  return (
    <div>
      <section className="pb-10">
        <h2 className="text_type_main-medium mb-6">
          {ingredients.nameCategory}
        </h2>
        <ul className={`${burgerCategoryStyle.list} pl-4 `}>
          {ingredients.products.map((item) => (
            <li
              key={item._id}
              className={burgerCategoryStyle.item}
              onClick={() => openCard(item)}
            >
              <BurgerCard ingredient={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

BurgerCategory.propTypes = burgerCategoryPropTypes;

export { BurgerCategory };
