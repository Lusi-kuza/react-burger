import React from "react";
import burgerCategoryStyle from "./burger-category.module.css";
import { BurgerCard } from "./burger-card/burger-card";

const BurgerCategory = ({ ingredients }) => {
  return (
    <div>
      <section className="pb-10">
        <h2 className="text_type_main-medium mb-6">
          {ingredients.nameCategory}
        </h2>
        <ul className={`${burgerCategoryStyle.list} pl-4 `}>
          {ingredients.products.map((item) => (
            <li key={item._id} className={burgerCategoryStyle.item}>
              <BurgerCard ingredient={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export { BurgerCategory };
