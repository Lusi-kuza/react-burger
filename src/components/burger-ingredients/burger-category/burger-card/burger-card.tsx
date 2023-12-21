import React from "react";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import burgerCardStyle from "./burger-card.module.css";
import { BurgerPrice } from "../../../burger-price/burger-price";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TBurgerProducts } from "../../../../utils/types";

type TBurgerCardProps = {
  ingredient: TBurgerProducts;
  count: number | null;
};

export type TDragObject = Omit<TBurgerCardProps, "count">;

const BurgerCard = ({ ingredient, count }: TBurgerCardProps): JSX.Element => {
  const [, bunDragRef] = useDrag<TDragObject, unknown, unknown>({
    type: "bun",
    item: { ingredient },
  });

  const [, fillingDragRef] = useDrag<TDragObject, unknown, unknown>({
    type: "filling",
    item: { ingredient },
  });

  const location = useLocation();
  const ingredientId = ingredient._id;

  return (
    <Link
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
      className={burgerCardStyle.link}
    >
      <div
        className={burgerCardStyle.item}
        ref={ingredient.type === "bun" ? bunDragRef : fillingDragRef}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={burgerCardStyle.img}
        />
        <BurgerPrice
          price={ingredient.price}
          fontStyle={"text_type_digits-default"}
        />
        <p className={burgerCardStyle.title}>{ingredient.name}</p>
        {count && <Counter count={count} size="default" />}
      </div>
    </Link>
  );
};

export { BurgerCard };
