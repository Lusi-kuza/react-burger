import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  FeedPage,
  ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../../pages";
import { ProfileForm } from "../account/profile-form/profile-form";
import { OrderHistory } from "../account/order-history/order-history";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../burger-ingredients/ingredient-details/ingredient-details";
import { AppHeader } from "../app-header/app-header";

import { getIngredients } from "../../services/ingredients/actions";
import { checkUserAuth } from "../../services/form/actions";
import {
  OnlyAuthUser,
  OnlyUnAuthUser,
  OnlyUnAuthUserWithCheck,
} from "../protected-route/protected-route";
import { Preloader } from "../preloader/preloader";
import { OrderCardDetails } from "../order-card/order-card-details/order-card-details";
import { useDispatch, useSelector } from "../../services/reducer";

const App = (): JSX.Element => {
  const { isLoading, hasError, INGREDIENTS_DATA } = useSelector(
    (store) => store.ingredients
  );

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className="pt-10">
      <AppHeader />
      {isLoading && <Preloader />}
      {!isLoading && hasError && (
        <p className="text_type_main-large mt-10">Ошибка при загрузке данных</p>
      )}
      {!isLoading && !hasError && INGREDIENTS_DATA.length > 0 && (
        <>
          <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/ingredients/:ingredientId"
              element={<IngredientPage />}
            />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:orderId" element={<OrderPage />} />
            <Route
              path="/login"
              element={<OnlyUnAuthUser component={<LoginPage />} />}
            />
            <Route
              path="/register"
              element={<OnlyUnAuthUser component={<RegisterPage />} />}
            />
            <Route
              path="/forgot-password"
              element={<OnlyUnAuthUser component={<ForgotPasswordPage />} />}
            />
            <Route
              path="/reset-password"
              element={
                <OnlyUnAuthUserWithCheck component={<ResetPasswordPage />} />
              }
            />{" "}
            <Route
              path="/profile/orders/:orderId"
              element={<OnlyAuthUser component={<OrderPage />} />}
            />
            <Route
              path="/profile"
              element={<OnlyAuthUser component={<ProfilePage />} />}
            >
              <Route
                index
                element={<OnlyAuthUser component={<ProfileForm />} />}
              />
              <Route
                path="orders"
                element={<OnlyAuthUser component={<OrderHistory />} />}
              />
            </Route>
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:ingredientId"
                element={
                  <Modal
                    title={"Детали ингредиента"}
                    closeModal={handleModalClose}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path="/feed/:orderId"
                element={
                  <Modal closeModal={handleModalClose}>
                    <OrderCardDetails inModal={true} />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:orderId"
                element={
                  <Modal closeModal={handleModalClose}>
                    <OrderCardDetails inModal={true} />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
