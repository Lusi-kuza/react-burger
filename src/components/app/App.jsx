import React from "react";
import appStyles from "./App.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { INGREDUENTS_DATA } from "../../utils/data";

function App() {
  const ingredients = INGREDUENTS_DATA.reduce(
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
