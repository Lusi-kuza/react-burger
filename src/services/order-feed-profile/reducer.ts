import { TOrderCard, WebsocketStatus } from "../../utils/types";

import {
  ORDER_FEED_WS_CLOSE_PROFILE,
  ORDER_FEED_WS_CONNECTING_PROFILE,
  ORDER_FEED_WS_ERROR_PROFILE,
  ORDER_FEED_WS_MESSAGE_PROFILE,
  ORDER_FEED_WS_OPEN_PROFILE,
  TOrderFeedProfileActions,
} from "./actions";

type TOrderFeedState = {
  status: WebsocketStatus;
  orders: Array<TOrderCard>;
  total: number;
  totalToday: number;
  connectingError: string;
};

export const initialState: TOrderFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: "",
};

export const orderFeedReducerProfile = (
  state = initialState,
  action: TOrderFeedProfileActions
) => {
  switch (action.type) {
    case ORDER_FEED_WS_CONNECTING_PROFILE:
      return { ...state, status: WebsocketStatus.CONNECTING };
    case ORDER_FEED_WS_OPEN_PROFILE:
      return { ...state, status: WebsocketStatus.ONLINE, connectingError: "" };
    case ORDER_FEED_WS_CLOSE_PROFILE:
      return { ...state, status: WebsocketStatus.OFFLINE };
    case ORDER_FEED_WS_MESSAGE_PROFILE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case ORDER_FEED_WS_ERROR_PROFILE:
      return { ...state, connectingError: action.payload };
    default:
      return state;
  }
};
