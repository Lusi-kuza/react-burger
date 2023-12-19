import React from "react";
import homePageStyles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";

const HomePage = (): JSX.Element => {
  return (
    <div>
      <main className={homePageStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};

export default HomePage;
