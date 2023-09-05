import React, { useState, useEffect } from "react";
import appStyles from "./App.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/burger-api";

function App() {
  const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    INGREDIENTS_DATA: [],
  });

  const getIngredients = () => {
    setState({ ...state, isLoading: true, hasError: false });
    getData(dataUrl)
      .then((data) =>
        setState({ ...state, isLoading: false, INGREDIENTS_DATA: data.data })
      )
      .catch((e) => {
        setState({ ...state, isLoading: false, hasError: true });
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const ingredients = state.INGREDIENTS_DATA.reduce(
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

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={`${appStyles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor
          ingredients={[
            ...ingredients.main.products,
            ...ingredients.sauce.products,
          ]}
        />
      </main>
    </div>
  );
}

export default App;
