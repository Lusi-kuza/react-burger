import { Middleware } from "redux";
import {
  TOrderFeedConnect,
  TOrderFeedDisconnect,
  TOrderFeedWSClose,
  TOrderFeedWSConnecting,
  TOrderFeedWSError,
  TOrderFeedWSMessage,
  TOrderFeedWSOpen,
} from "../order-feed/actions";
import { TRootState } from "../reducer";
import { TAllOrder } from "../../utils/types";
import {
  TOrderFeedConnectProfile,
  TOrderFeedDisconnectProfile,
  TOrderFeedWSCloseProfile,
  TOrderFeedWSConnectingProfile,
  TOrderFeedWSErrorProfile,
  TOrderFeedWSMessageProfile,
  TOrderFeedWSOpenProfile,
} from "../order-feed-profile/actions";

export type TWsActionTypes = {
  wsConnect: (url: string) => TOrderFeedConnect | TOrderFeedConnectProfile;
  wsDisconnect: () => TOrderFeedDisconnect | TOrderFeedDisconnectProfile;
  wsConnecting: () => TOrderFeedWSConnecting | TOrderFeedWSConnectingProfile;
  onOpen: () => TOrderFeedWSOpen | TOrderFeedWSOpenProfile;
  onClose: () => TOrderFeedWSClose | TOrderFeedWSCloseProfile;
  onMessage: (
    data: TAllOrder
  ) => TOrderFeedWSMessage | TOrderFeedWSMessageProfile;
  onError: (error: string) => TOrderFeedWSError | TOrderFeedWSErrorProfile;
};

export const socketMiddleware = (
  wsActions: TWsActionTypes
): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let closing = false;
    let wsUrl: string;

    return (next) => (action) => {
      const { dispatch } = store;

      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (wsConnect(action.payload).type === action.type) {
        wsUrl = action.payload;
        closing = false;
        socket = new WebSocket(wsUrl);
        dispatch(wsConnecting());
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (closing) {
            dispatch(onClose());
          } else {
            dispatch(wsConnect(wsUrl));
          }
        };
      }
      if (wsDisconnect().type === action.type) {
        closing = true;
        socket?.close();
        socket = null;
      }
      next(action);
    };
  };
};
