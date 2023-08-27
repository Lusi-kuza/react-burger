import React from "react";
import burgerPriceStyle from "./burger-price.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

const BurgerPrice = ({ price, style }) => {
  return (
    <div className={burgerPriceStyle.price}>
      <p className={style}>{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export { BurgerPrice };
