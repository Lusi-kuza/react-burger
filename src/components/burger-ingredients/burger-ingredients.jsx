import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerCategory } from "./burger-category/burger-category";
// import { burgerIngredientPropTypes } from "../../utils/types";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "./ingredient-details/ingredient-details";
import {
  BurgerContext,
  ConstructorIngredientsContext,
} from "../../services/appContext";

const BurgerIngredients = () => {
  const [currentIngredient, setCurrentIngredient] = useState();
  const [current, setCurrent] = useState("bun");

  const ingredients = useContext(BurgerContext);
  const { constructorIngredientsDispatcher } = useContext(
    ConstructorIngredientsContext
  );

  const ingredientsForCategory = ingredients.reduce(
    (obj, item) => {
      if (item.type === "bun") {
        obj.bun.products.push(item);
      }
      if (item.type === "main") {
        obj.main.products.push(item);
      }
      if (item.type === "sauce") {
        obj.sauce.products.push(item);
      }
      return obj;
    },
    {
      bun: {
        idCategory: 1,
        nameCategory: "Булки",
        products: [],
      },
      sauce: { idCategory: 2, nameCategory: "Соусы", products: [] },
      main: { idCategory: 3, nameCategory: "Начинки", products: [] },
    }
  );

  const openCard = (item) => {
    setCurrentIngredient(item);
    if (item.type === "bun") {
      constructorIngredientsDispatcher({ type: "addBun", payload: item });
    } else {
      constructorIngredientsDispatcher({
        type: "addIngredient",
        payload: { ...item, id_for_key: uuidv4() },
      });
    }
  };

  const closeCard = () => {
    setCurrentIngredient(null);
  };

  return (
    <div className={`${burgerIngredientsStyle.block} pt-10`}>
      <h1
        className={`${burgerIngredientsStyle.title} text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${burgerIngredientsStyle.tab} mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyle.ingredients} custom-scroll`}>
        {Object.values(ingredientsForCategory).map((item) => (
          <BurgerCategory
            key={item.idCategory}
            ingredients={item}
            openCard={openCard}
          />
        ))}
      </div>
      {currentIngredient && (
        <Modal title={"Детали ингредиента"} closeModal={closeCard}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};

// BurgerIngredients.propTypes = burgerIngredientPropTypes;

export { BurgerIngredients };
