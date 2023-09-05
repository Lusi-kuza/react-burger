import React from "react";
import burgerPriceStyle from "./burger-price.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { burgerPricePropTypes } from "../../utils/types";

const BurgerPrice = ({ price, fontStyle }) => {
  return (
    <div className={burgerPriceStyle.price}>
      <p className={fontStyle}>{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};
BurgerPrice.propTypes = burgerPricePropTypes;

export { BurgerPrice };
