import React from "react";

import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import burgerCardStyle from "./burger-card.module.css";
import { BurgerPrice } from "../../../burger-price/burger-price";
import { burgerCardPropTypes } from "../../../../utils/types";
import { useDrag } from "react-dnd";

const BurgerCard = ({ ingredient, count }) => {
  const [, bunDragRef] = useDrag({
    type: "bun",
    item: { ingredient },
  });

  const [, fillingDragRef] = useDrag({
    type: "filling",
    item: { ingredient },
  });

  return (
    <div
      className={burgerCardStyle.item}
      ref={ingredient.type === "bun" ? bunDragRef : fillingDragRef}
    >
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <BurgerPrice
        price={ingredient.price}
        fontStyle={"text_type_digits-default"}
      />
      <p className={`${burgerCardStyle.title} text_type_main-default`}>
        {ingredient.name}
      </p>
      {count && <Counter count={count} size="default" />}
    </div>
  );
};

BurgerCard.propTypes = burgerCardPropTypes;

export { BurgerCard };
