import React from "react";

import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";

import burgerConstructorStyle from "./burger-constructor.module.css";
import { BurgerPrice } from "../burger-price/burger-price";
import { burgerConstructorPropTypes } from "../../utils/types";

const BurgerConstructor = ({ ingredients }) => {
  return (
    <div className={`${burgerConstructorStyle.block} pt-25 pl-4 `}>
      <div
        className={`${burgerConstructorStyle.burger} mb-10`}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          extraClass={"ml-7"}
        />
        <ul className={`${burgerConstructorStyle.insides} custom-scroll`}>
          {ingredients.map((el) => (
            <li className={burgerConstructorStyle.item} key={el._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          extraClass={"ml-7"}
        />
      </div>

      <div className={`${burgerConstructorStyle.ordering} mr-4`}>
        <BurgerPrice price={610} fontStyle={"text_type_digits-medium"} />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = burgerConstructorPropTypes;

export { BurgerConstructor };
