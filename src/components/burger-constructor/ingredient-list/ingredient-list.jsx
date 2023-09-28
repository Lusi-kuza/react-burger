import React, { useRef, useCallback } from "react";
import ingredientListStyle from "./ingredient-list.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../../services/constructor-Ingredients/actions";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { IngredientListPropTypes } from "../../../utils/types";

const IngredientList = ({ product, index }) => {
  const { bun, ingredient } = useSelector(
    (store) => store.constructorIngredients
  );

  const dispatch = useDispatch();

  const deleteIngredient = (elem) => {
    dispatch({
      type: DELETE_INGREDIENT,
      payload: elem,
    });
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: MOVE_INGREDIENT,
        payload: {
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
        },
      });
    },
    [ingredient]
  );

  const ref = useRef(null);

  const [{ opacity }, fillingBurgerDragRef] = useDrag({
    type: "fillingBurger",
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, fillingBurgerDropRef] = useDrop({
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
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const dragDropRef = fillingBurgerDragRef(fillingBurgerDropRef(ref));

  return (
    <li
      className={ingredientListStyle.item}
      ref={dragDropRef}
      style={{ opacity }}
    >
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

IngredientList.propTypes = IngredientListPropTypes;

export { IngredientList };
