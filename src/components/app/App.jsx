import React, { useEffect } from "react";
import appStyles from "./App.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { isLoading, hasError, INGREDIENTS_DATA } = useSelector(
    (store) => store.ingredients
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={`${appStyles.main} pl-5 pr-5`}>
        {isLoading && (
          <p className="text_type_main-large mt-10">Загрузка данных...</p>
        )}
        {!isLoading && hasError && (
          <p className="text_type_main-large mt-10">
            Ошибка при загрузке данных
          </p>
        )}
        {!isLoading && !hasError && INGREDIENTS_DATA.length > 0 && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </div>
  );
}

export default App;
