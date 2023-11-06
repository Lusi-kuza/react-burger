import { combineReducers } from "redux";
import { constructorReducer } from "./constructor-Ingredients/reducer";
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "./order/reducer";
import { formReducer } from "./form/reducer";
import { orderFeedReducer } from "./order-feed/reducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  TOrderFeedActions,
  connect,
  disconnect,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./order-feed/actions";
import { TConstructorActions } from "./constructor-Ingredients/actions";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import type {} from "redux-thunk/extend-redux";
import { ThunkAction } from "redux-thunk";
import {
  TOrderFeedProfileActions,
  connectProfile,
  disconnectProfile,
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from "./order-feed-profile/actions";

import { orderFeedReducerProfile } from "./order-feed-profile/reducer";
import { TOrderActions } from "./order/actions";
import { TIngredientsActions } from "./ingredients/actions";
import { TFormActions } from "./form/actions";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructorIngredients: constructorReducer,
  form: formReducer,
  orderFeed: orderFeedReducer,
  orderFeedProfile: orderFeedReducerProfile,
});

export type TRootState = ReturnType<typeof rootReducer>;

export const orderFeedMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onMessage: wsMessage,
  onError: wsError,
});

export const orderFeedProfileMiddleware = socketMiddleware({
  wsConnect: connectProfile,
  wsDisconnect: disconnectProfile,
  wsConnecting: wsConnectingProfile,
  onOpen: wsOpenProfile,
  onClose: wsCloseProfile,
  onMessage: wsMessageProfile,
  onError: wsErrorProfile,
});

export type AppActions =
  | TIngredientsActions
  | TConstructorActions
  | TOrderActions
  | TFormActions
  | TOrderFeedActions
  | TOrderFeedProfileActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  AppActions
>;

type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
