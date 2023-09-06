import React, { useState, useContext } from "react";

import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";

import burgerConstructorStyle from "./burger-constructor.module.css";
import { BurgerPrice } from "../burger-price/burger-price";
// import { burgerConstructorPropTypes } from "../../utils/types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";
import { ConstructorIngredientsContext } from "../../services/appContext";
import { getOrder } from "../../utils/burger-api";

const BurgerConstructor = () => {
  const { constructorIngredients, constructorIngredientsDispatcher } =
    useContext(ConstructorIngredientsContext);

  const deleteIngredient = (elem) =>
    constructorIngredientsDispatcher({
      type: "deleteIngredient",
      payload: elem,
    });

  let totalPrice =
    (constructorIngredients.bun ? constructorIngredients.bun.price * 2 : 0) +
    (constructorIngredients.ingredient.length
      ? constructorIngredients.ingredient.reduce((sum, el) => sum + el.price, 0)
      : 0);

  const [order, setOrder] = useState({
    isLoading: false,
    hasError: false,
    orderNumber: null,
  });

  const makeOrder = () => {
    setOrder({ ...order, isLoading: true, hasError: false });
    getOrder(constructorIngredients)
      .then((data) =>
        setOrder({
          ...order,
          isLoading: false,
          orderNumber: data.order.number,
        })
      )
      .catch((e) => {
        setOrder({ ...order, isLoading: false, hasError: true });
      });
  };

  const resetOrder = () => {
    setOrder({ isLoading: false, hasError: false, orderNumber: null });
    constructorIngredientsDispatcher({ type: "deleteAll" });
  };

  return (
    <div className={`${burgerConstructorStyle.block} pt-25 pl-4 `}>
      <div
        className={`${burgerConstructorStyle.burger} mb-10`}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {constructorIngredients.bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={constructorIngredients.bun.name}
            price={constructorIngredients.bun.price}
            thumbnail={constructorIngredients.bun.image}
            extraClass={"ml-7"}
          />
        )}
        {constructorIngredients.ingredient.length > 0 && (
          <ul className={`${burgerConstructorStyle.insides} custom-scroll`}>
            {constructorIngredients.ingredient.map((el) => (
              <li className={burgerConstructorStyle.item} key={el.id_for_key}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                  handleClose={() => deleteIngredient(el)}
                />
              </li>
            ))}
          </ul>
        )}
        {constructorIngredients.bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={constructorIngredients.bun.name}
            price={constructorIngredients.bun.price}
            thumbnail={constructorIngredients.bun.image}
            extraClass={"ml-7"}
          />
        )}
      </div>

      <div className={`${burgerConstructorStyle.ordering} mr-4`}>
        <BurgerPrice price={totalPrice} fontStyle={"text_type_digits-medium"} />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={makeOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {!order.isLoading && !order.hasError && order.orderNumber && (
        <Modal title={""} closeModal={resetOrder}>
          <OrderDetails order={order.orderNumber} />
        </Modal>
      )}
    </div>
  );
};

// BurgerConstructor.propTypes = burgerConstructorPropTypes;

export { BurgerConstructor };
