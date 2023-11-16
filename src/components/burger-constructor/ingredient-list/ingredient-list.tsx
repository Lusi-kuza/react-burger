import React, { useRef, useCallback } from "react";
import ingredientListStyle from "./ingredient-list.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../../services/constructor-Ingredients/actions";

import { useDrag, useDrop } from "react-dnd";
import { TBurgerConstructorProducts } from "../../../utils/types";
import { useDispatch, useSelector } from "../../../services/reducer";

type TIngredientListProps = {
  product: TBurgerConstructorProducts;
  index: number;
};

type TDragObjIngredient = Omit<TIngredientListProps, "product">;

type TDragCollectedPropsIngredient = {
  opacity: number;
};

const IngredientList = ({
  product,
  index,
}: TIngredientListProps): JSX.Element => {
  const ingredient = useSelector(
    (store) => store.constructorIngredients.ingredient
  );

  const dispatch = useDispatch();

  const deleteIngredient = (elem: TBurgerConstructorProducts) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: elem,
    });
  };

  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch({
        type: MOVE_INGREDIENT,
        payload: {
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
        },
      });
    },
    [dispatch]
  );

  const ref = useRef<HTMLLIElement | null>(null);

  const [{ opacity }, fillingBurgerDragRef] = useDrag<
    TDragObjIngredient,
    unknown,
    TDragCollectedPropsIngredient
  >({
    type: "fillingBurger",
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, fillingBurgerDropRef] = useDrop<TDragObjIngredient>({
    accept: "fillingBurger",

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;

      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  fillingBurgerDragRef(fillingBurgerDropRef(ref));

  return (
    <li className={ingredientListStyle.item} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={product.name}
        price={product.price}
        thumbnail={product.image}
        handleClose={() => deleteIngredient(product)}
      />
    </li>
  );
};

export { IngredientList };
