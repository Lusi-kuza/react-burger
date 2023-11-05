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
  wsUrl: string,
  wsActions: TWsActionTypes
): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let closing = false;

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

      if (wsConnect(wsUrl).type === action.type) {
        socket = new WebSocket(
          `${wsUrl}?token=${localStorage.getItem("accessToken")?.slice(7)}`
        );
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
