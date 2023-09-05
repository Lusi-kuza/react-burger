import React from "react";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerCategory } from "./burger-category/burger-category";
import { burgerIngredientPropTypes } from "../../utils/types";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState("one");
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
        {Object.values(ingredients).map((item) => (
          <BurgerCategory key={item.idCategory} ingredients={item} />
        ))}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = burgerIngredientPropTypes;

export { BurgerIngredients };
