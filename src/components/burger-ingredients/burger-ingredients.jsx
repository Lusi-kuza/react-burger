import React, { useState, useRef } from "react";

import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerCategory } from "./burger-category/burger-category";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const { INGREDIENTS_DATA } = useSelector((store) => store.ingredients);

  const [currentCategory, setCurrentCategory] = useState("bun");

  const tabRef = useRef(null);

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const ingredientsForCategory = INGREDIENTS_DATA.reduce(
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
        categoryRef: bunRef,
      },
      sauce: {
        idCategory: 2,
        nameCategory: "Соусы",
        products: [],
        categoryRef: sauceRef,
      },
      main: {
        idCategory: 3,
        nameCategory: "Начинки",
        products: [],
        categoryRef: mainRef,
      },
    }
  );

  const scrollCategory = () => {
    const bottomTab = tabRef.current.getBoundingClientRect().bottom;
    const spaceBun = Math.abs(
      bottomTab - bunRef.current.getBoundingClientRect().top
    );
    const spaceSauce = Math.abs(
      bottomTab - sauceRef.current.getBoundingClientRect().top
    );
    const spaceMain = Math.abs(
      bottomTab - mainRef.current.getBoundingClientRect().top
    );

    switch (Math.min(spaceBun, spaceSauce, spaceMain)) {
      case spaceBun:
        return setCurrentCategory("bun");
      case spaceSauce:
        return setCurrentCategory("sauce");
      case spaceMain:
        return setCurrentCategory("main");
      default:
        return;
    }
  };

  return (
    <div className={`${burgerIngredientsStyle.block} pt-10`}>
      <h1
        className={`${burgerIngredientsStyle.title} text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${burgerIngredientsStyle.tab} mb-10`} ref={tabRef}>
        <Tab
          value="bun"
          active={currentCategory === "bun"}
          onClick={setCurrentCategory}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentCategory === "sauce"}
          onClick={setCurrentCategory}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentCategory === "main"}
          onClick={setCurrentCategory}
        >
          Начинки
        </Tab>
      </div>

      <div
        className={`${burgerIngredientsStyle.ingredients} custom-scroll`}
        onScroll={scrollCategory}
      >
        {Object.values(ingredientsForCategory).map((item) => (
          <BurgerCategory key={item.idCategory} ingredients={item} />
        ))}
      </div>
    </div>
  );
};

export { BurgerIngredients };
