import { TAllOrder } from "../../utils/types";

export const ORDER_FEED_CONNECT: "ORDER_FEED_CONNECT" = "ORDER_FEED_CONNECT";
export const ORDER_FEED_DISCONNECT: "ORDER_FEED_DISCONNECT" =
  "ORDER_FEED_DISCONNECT";
export const ORDER_FEED_WS_CONNECTING: "ORDER_FEED_WS_CONNECTING" =
  "ORDER_FEED_WS_CONNECTING";
export const ORDER_FEED_WS_OPEN: "ORDER_FEED_WS_OPEN" = "ORDER_FEED_WS_OPEN";
export const ORDER_FEED_WS_CLOSE: "ORDER_FEED_WS_CLOSE" = "ORDER_FEED_WS_CLOSE";
export const ORDER_FEED_WS_MESSAGE: "ORDER_FEED_WS_MESSAGE" =
  "ORDER_FEED_WS_MESSAGE";
export const ORDER_FEED_WS_ERROR: "ORDER_FEED_WS_ERROR" = "ORDER_FEED_WS_ERROR";

export type TOrderFeedConnect = {
  type: typeof ORDER_FEED_CONNECT;
  payload: string;
};

export type TOrderFeedDisconnect = {
  type: typeof ORDER_FEED_DISCONNECT;
};

export type TOrderFeedWSConnecting = {
  type: typeof ORDER_FEED_WS_CONNECTING;
};

export type TOrderFeedWSOpen = {
  type: typeof ORDER_FEED_WS_OPEN;
};

export type TOrderFeedWSClose = {
  type: typeof ORDER_FEED_WS_CLOSE;
};

export type TOrderFeedWSMessage = {
  type: typeof ORDER_FEED_WS_MESSAGE;
  payload: TAllOrder;
};

export type TOrderFeedWSError = {
  type: typeof ORDER_FEED_WS_ERROR;
  payload: string;
};

export type TOrderFeedActions =
  | TOrderFeedConnect
  | TOrderFeedDisconnect
  | TOrderFeedWSConnecting
  | TOrderFeedWSOpen
  | TOrderFeedWSClose
  | TOrderFeedWSMessage
  | TOrderFeedWSError;

export const connect = (url: string): TOrderFeedConnect => ({
  type: ORDER_FEED_CONNECT,
  payload: url,
});

export const disconnect = (): TOrderFeedDisconnect => ({
  type: ORDER_FEED_DISCONNECT,
});

export const wsConnecting = (): TOrderFeedWSConnecting => ({
  type: ORDER_FEED_WS_CONNECTING,
});

export const wsOpen = (): TOrderFeedWSOpen => ({
  type: ORDER_FEED_WS_OPEN,
});

export const wsClose = (): TOrderFeedWSClose => ({
  type: ORDER_FEED_WS_CLOSE,
});

export const wsMessage = (data: TAllOrder): TOrderFeedWSMessage => ({
  type: ORDER_FEED_WS_MESSAGE,
  payload: data,
});

export const wsError = (error: string): TOrderFeedWSError => ({
  type: ORDER_FEED_WS_ERROR,
  payload: error,
});
