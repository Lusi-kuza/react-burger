import React, { useState, useEffect, useReducer } from "react";
import appStyles from "./App.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getProduct } from "../../utils/burger-api";
import {
  BurgerContext,
  ConstructorIngredientsContext,
} from "../../services/appContext";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    INGREDIENTS_DATA: [],
  });

  const constructorInitialState = {
    bun: null,
    ingredient: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "addBun":
        return { ...state, bun: action.payload };
      case "addIngredient":
        return { ...state, ingredient: [...state.ingredient, action.payload] };
      case "deleteIngredient":
        return {
          ...state,
          ingredient: state.ingredient.filter(
            (item) => item !== action.payload
          ),
        };
      case "deleteAll":
        return constructorInitialState;

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const [constructorIngredients, constructorIngredientsDispatcher] = useReducer(
    reducer,
    constructorInitialState,
    undefined
  );

  const getIngredients = () => {
    setState({ ...state, isLoading: true, hasError: false });
    getProduct()
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

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={`${appStyles.main} pl-5 pr-5`}>
        {state.isLoading && (
          <p className="text_type_main-large mt-10">Загрузка данных...</p>
        )}
        {!state.isLoading && state.hasError && (
          <p className="text_type_main-large mt-10">
            Ошибка при загрузке данных
          </p>
        )}
        {!state.isLoading &&
          !state.hasError &&
          state.INGREDIENTS_DATA.length > 0 && (
            <BurgerContext.Provider value={state.INGREDIENTS_DATA}>
              <ConstructorIngredientsContext.Provider
                value={{
                  constructorIngredients,
                  constructorIngredientsDispatcher,
                }}
              >
                <BurgerIngredients />
                <BurgerConstructor />
              </ConstructorIngredientsContext.Provider>
            </BurgerContext.Provider>
          )}
      </main>
    </div>
  );
}

export default App;
