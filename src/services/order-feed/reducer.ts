import { TOrderCard, WebsocketStatus } from "../../utils/types";
import {
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
  TOrderFeedActions,
} from "./actions";

type TOrderFeedState = {
  status: WebsocketStatus;
  orders: Array<TOrderCard>;
  total: number;
  totalToday: number;
  connectingError: string;
};

const initialState: TOrderFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: "",
};

export const orderFeedReducer = (
  state = initialState,
  action: TOrderFeedActions
) => {
  switch (action.type) {
    case ORDER_FEED_WS_CONNECTING:
      return { ...state, status: WebsocketStatus.CONNECTING };
    case ORDER_FEED_WS_OPEN:
      return { ...state, status: WebsocketStatus.ONLINE, connectingError: "" };
    case ORDER_FEED_WS_CLOSE:
      return { ...state, status: WebsocketStatus.OFFLINE };
    case ORDER_FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case ORDER_FEED_WS_ERROR:
      return { ...state, connectingError: action.payload };
    default:
      return state;
  }
};
