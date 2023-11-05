import React from "react";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import burgerConstructorStyle from "./burger-constructor.module.css";
import { BurgerPrice } from "../burger-price/burger-price";
import { Modal } from "../modal/modal";
import { OrderDetails } from "./order-details/order-details";

import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
} from "../../services/constructor-Ingredients/actions";
import { RESET_ORDER, getOrder } from "../../services/order/actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { IngredientList } from "./ingredient-list/ingredient-list";
import { useLocation, useNavigate } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { TDragObject } from "../burger-ingredients/burger-category/burger-card/burger-card";
import { TBurgerConstructorProducts } from "../../utils/types";
import { useDispatch, useSelector } from "../../services/reducer";

type TDropCollectedPropsBun = {
  isHoverBun: boolean;
};

type TDropCollectedPropsFilling = {
  isHoverFilling: boolean;
};

const BurgerConstructor = (): JSX.Element => {
  const { bun, ingredient } = useSelector(
    (store) => store.constructorIngredients
  );

  const { isLoading, hasError, orderNumber } = useSelector(
    (store) => store.order
  );
  const user = useSelector((store) => store.form.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientPrice: number = ingredient.reduce(
    (sum: number, el: TBurgerConstructorProducts) => {
      sum = sum + el.price;
      return sum;
    },
    0
  );

  let totalPrice = bunPrice + ingredientPrice;

  let finalIngredients = (): Array<string> => [
    bun?._id || "",
    ...ingredient.map((el: TBurgerConstructorProducts) => el._id),
  ];

  const makeOrder = () => {
    if (!user) return navigate("/login", { state: { from: location } });
    dispatch(getOrder(finalIngredients()));
  };

  const resetOrder = () => {
    dispatch({
      type: RESET_ORDER,
    });
    dispatch({ type: DELETE_ALL_INGREDIENTS });
  };

  const [{ isHoverBun }, bunDropTarget] = useDrop<
    TDragObject,
    unknown,
    TDropCollectedPropsBun
  >({
    accept: "bun",
    drop(item) {
      dispatch({ type: ADD_BUN, payload: item.ingredient });
    },
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
  });

  const [{ isHoverFilling }, fillingDropTarget] = useDrop<
    TDragObject,
    unknown,
    TDropCollectedPropsFilling
  >({
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
            {ingredient.map((el: TBurgerConstructorProducts, ind: number) => (
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
      {isLoading && <Preloader />}
      {!isLoading && !hasError && orderNumber && (
        <Modal closeModal={resetOrder}>
          <OrderDetails order={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export { BurgerConstructor };
