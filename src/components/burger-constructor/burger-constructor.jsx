import React from "react";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import burgerConstructorStyle from "./burger-constructor.module.css";
import { BurgerPrice } from "../burger-price/burger-price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENT,
} from "../../services/constructor-Ingredients/actions";
import { RESET_ORDER, getOrder } from "../../services/order/actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { IngredientList } from "./ingredient-list/ingredient-list";

const BurgerConstructor = () => {
  const { bun, ingredient } = useSelector(
    (store) => store.constructorIngredients
  );

  const { isLoading, hasError, orderNumber } = useSelector(
    (store) => store.order
  );

  const dispatch = useDispatch();

  let totalPrice =
    (bun ? bun.price * 2 : 0) +
    (ingredient.length ? ingredient.reduce((sum, el) => sum + el.price, 0) : 0);

  let finalIngredients = () => [bun._id, ...ingredient.map((el) => el._id)];

  const makeOrder = () => {
    dispatch(getOrder(finalIngredients()));
  };

  const resetOrder = () => {
    dispatch({
      type: RESET_ORDER,
    });
    dispatch({ type: DELETE_ALL_INGREDIENT });
  };

  const [{ isHoverBun }, bunDropTarget] = useDrop({
    accept: "bun",
    drop(item) {
      dispatch({ type: ADD_BUN, payload: item.ingredient });
    },
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
  });

  const [{ isHoverFilling }, fillingDropTarget] = useDrop({
    accept: "filling",
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...item.ingredient, id_for_key: uuidv4() },
      });
    },
    collect: (monitor) => ({
      isHoverFilling: monitor.isOver(),
    }),
  });

  const borderColorBun = isHoverBun ? burgerConstructorStyle.target : "";
  const borderColorFilling = isHoverFilling
    ? burgerConstructorStyle.target
    : "";

  return (
    <div className={`${burgerConstructorStyle.block} pt-25 pl-4 `}>
      <div
        className={`${burgerConstructorStyle.burger} mb-10`}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {bun ? (
          <div ref={bunDropTarget}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${borderColorBun} ml-7`}
            />
          </div>
        ) : (
          <div
            ref={bunDropTarget}
            className={`${borderColorBun} ${burgerConstructorStyle.constructor_element} ${burgerConstructorStyle.constructor_element_pos_top} ml-7`}
          >
            Выберите булки
          </div>
        )}
        {ingredient.length > 0 ? (
          <ul
            className={`${burgerConstructorStyle.insides}  ${borderColorFilling} custom-scroll`}
            ref={fillingDropTarget}
          >
            {ingredient.map((el, ind) => (
              <IngredientList key={el.id_for_key} product={el} index={ind} />
            ))}
          </ul>
        ) : (
          <div
            ref={fillingDropTarget}
            className={`${burgerConstructorStyle.constructor_element} ${borderColorFilling} ml-7`}
          >
            Выберите начинку
          </div>
        )}
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={"ml-7"}
          />
        ) : (
          <div
            className={`${burgerConstructorStyle.constructor_element} ${burgerConstructorStyle.constructor_element_pos_bottom} ml-7`}
          >
            Выберите булки
          </div>
        )}
      </div>

      <div className={`${burgerConstructorStyle.ordering} mr-4`}>
        <BurgerPrice price={totalPrice} fontStyle={"text_type_digits-medium"} />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          {...(bun && { onClick: makeOrder })}
        >
          Оформить заказ
        </Button>
      </div>
      {!isLoading && !hasError && orderNumber && (
        <Modal title={""} closeModal={resetOrder}>
          <OrderDetails order={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export { BurgerConstructor };
