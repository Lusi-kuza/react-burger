import { TAllOrder } from "../../utils/types";

export const ORDER_FEED_CONNECT_PROFILE: "ORDER_FEED_CONNECT_PROFILE" =
  "ORDER_FEED_CONNECT_PROFILE";
export const ORDER_FEED_DISCONNECT_PROFILE: "ORDER_FEED_DISCONNECT_PROFILE" =
  "ORDER_FEED_DISCONNECT_PROFILE";
export const ORDER_FEED_WS_CONNECTING_PROFILE: "ORDER_FEED_WS_CONNECTING_PROFILE" =
  "ORDER_FEED_WS_CONNECTING_PROFILE";
export const ORDER_FEED_WS_OPEN_PROFILE: "ORDER_FEED_WS_OPEN_PROFILE" =
  "ORDER_FEED_WS_OPEN_PROFILE";
export const ORDER_FEED_WS_CLOSE_PROFILE: "ORDER_FEED_WS_CLOSE_PROFILE" =
  "ORDER_FEED_WS_CLOSE_PROFILE";
export const ORDER_FEED_WS_MESSAGE_PROFILE: "ORDER_FEED_WS_MESSAGE_PROFILE" =
  "ORDER_FEED_WS_MESSAGE_PROFILE";
export const ORDER_FEED_WS_ERROR_PROFILE: "ORDER_FEED_WS_ERROR_PROFILE" =
  "ORDER_FEED_WS_ERROR_PROFILE";

export type TOrderFeedConnectProfile = {
  type: typeof ORDER_FEED_CONNECT_PROFILE;
  payload: string;
};

export type TOrderFeedDisconnectProfile = {
  type: typeof ORDER_FEED_DISCONNECT_PROFILE;
};

export type TOrderFeedWSConnectingProfile = {
  type: typeof ORDER_FEED_WS_CONNECTING_PROFILE;
};

export type TOrderFeedWSOpenProfile = {
  type: typeof ORDER_FEED_WS_OPEN_PROFILE;
};

export type TOrderFeedWSCloseProfile = {
  type: typeof ORDER_FEED_WS_CLOSE_PROFILE;
};

export type TOrderFeedWSMessageProfile = {
  type: typeof ORDER_FEED_WS_MESSAGE_PROFILE;
  payload: TAllOrder;
};

export type TOrderFeedWSErrorProfile = {
  type: typeof ORDER_FEED_WS_ERROR_PROFILE;
  payload: string;
};

export type TOrderFeedProfileActions =
  | TOrderFeedConnectProfile
  | TOrderFeedDisconnectProfile
  | TOrderFeedWSConnectingProfile
  | TOrderFeedWSOpenProfile
  | TOrderFeedWSCloseProfile
  | TOrderFeedWSMessageProfile
  | TOrderFeedWSErrorProfile;

export const connectProfile = (url: string): TOrderFeedConnectProfile => ({
  type: ORDER_FEED_CONNECT_PROFILE,
  payload: url,
});

export const disconnectProfile = (): TOrderFeedDisconnectProfile => ({
  type: ORDER_FEED_DISCONNECT_PROFILE,
});

export const wsConnectingProfile = (): TOrderFeedWSConnectingProfile => ({
  type: ORDER_FEED_WS_CONNECTING_PROFILE,
});

export const wsOpenProfile = (): TOrderFeedWSOpenProfile => ({
  type: ORDER_FEED_WS_OPEN_PROFILE,
});

export const wsCloseProfile = (): TOrderFeedWSCloseProfile => ({
  type: ORDER_FEED_WS_CLOSE_PROFILE,
});

export const wsMessageProfile = (
  data: TAllOrder
): TOrderFeedWSMessageProfile => ({
  type: ORDER_FEED_WS_MESSAGE_PROFILE,
  payload: data,
});

export const wsErrorProfile = (error: string): TOrderFeedWSErrorProfile => ({
  type: ORDER_FEED_WS_ERROR_PROFILE,
  payload: error,
});
