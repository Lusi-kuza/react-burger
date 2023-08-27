import React from "react";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import burgerCardStyle from "./burger-card.module.css";
import { BurgerPrice } from "../../../burger-price/burger-price";

const BurgerCard = ({ ingredient }) => {
  return (
    <div className={burgerCardStyle.item}>
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <BurgerPrice
        price={ingredient.price}
        style={"text_type_digits-default"}
      />
      <p className={`${burgerCardStyle.title} text_type_main-default`}>
        {ingredient.name}
      </p>
      <Counter count={"1"} size="default" />
    </div>
  );
};

export { BurgerCard };
