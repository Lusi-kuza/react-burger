import React from "react";
import burgerPriceStyle from "./burger-price.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

type TFontStyleType = "text_type_digits-default" | "text_type_digits-medium";

type TBurgerPriceProps = {
  price: number;
  fontStyle: TFontStyleType;
};

const BurgerPrice = ({ price, fontStyle }: TBurgerPriceProps): JSX.Element => {
  return (
    <div className={burgerPriceStyle.price}>
      <p className={fontStyle}>{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export { BurgerPrice };
