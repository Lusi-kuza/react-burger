import React, { useState, useRef } from "react";

import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { BurgerCategory } from "./burger-category/burger-category";

import { TIngredientsRef } from "../../utils/types";
import { transformDataForCategory } from "../../utils/data";
import { useSelector } from "../../services/reducer";

const BurgerIngredients = (): JSX.Element => {
  const { INGREDIENTS_DATA } = useSelector((store) => store.ingredients);

  const [currentCategory, setCurrentCategory] = useState("bun");

  const tabRef = useRef<TIngredientsRef>(null);

  const bunRef = useRef<TIngredientsRef>(null);
  const sauceRef = useRef<TIngredientsRef>(null);
  const mainRef = useRef<TIngredientsRef>(null);

  const ingredientsForCategory = transformDataForCategory(
    INGREDIENTS_DATA,
    bunRef,
    sauceRef,
    mainRef
  );

  const scrollCategory = () => {
    const bottomTab = tabRef.current!.getBoundingClientRect().bottom;
    const spaceBun = Math.abs(
      bottomTab - bunRef.current!.getBoundingClientRect().top
    );
    const spaceSauce = Math.abs(
      bottomTab - sauceRef.current!.getBoundingClientRect().top
    );
    const spaceMain = Math.abs(
      bottomTab - mainRef.current!.getBoundingClientRect().top
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

  const setTab = (tab: string): void => {
    setCurrentCategory(tab);
    if (tab === "bun") bunRef.current!.scrollIntoView({ behavior: "smooth" });
    if (tab === "sauce")
      sauceRef.current!.scrollIntoView({ behavior: "smooth" });
    if (tab === "main") mainRef.current!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={burgerIngredientsStyle.block}>
      <h1
        className={burgerIngredientsStyle.title}
        data-testid="titleBurgerIngredients"
      >
        Соберите бургер
      </h1>
      <div className={burgerIngredientsStyle.tab} ref={tabRef}>
        <Tab
          value="bun"
          active={currentCategory === "bun"}
          onClick={() => setTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentCategory === "sauce"}
          onClick={() => setTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentCategory === "main"}
          onClick={() => setTab("main")}
        >
          Начинки
        </Tab>
      </div>

      <div
        className={burgerIngredientsStyle.ingredients}
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
