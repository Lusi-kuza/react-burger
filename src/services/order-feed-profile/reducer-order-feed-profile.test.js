import { WebsocketStatus } from "../../utils/types";
import {
  ORDER_FEED_WS_CLOSE_PROFILE,
  ORDER_FEED_WS_CONNECTING_PROFILE,
  ORDER_FEED_WS_ERROR_PROFILE,
  ORDER_FEED_WS_MESSAGE_PROFILE,
  ORDER_FEED_WS_OPEN_PROFILE,
} from "./actions";
import { initialState, orderFeedReducerProfile } from "./reducer";

describe("REDUCER --- ORDER FEED PROFILE", () => {
  it("should return the initial state", () => {
    expect(orderFeedReducerProfile(undefined, {})).toEqual(initialState);
  });

  it("should return state with WS status CONNECTING", () => {
    expect(
      orderFeedReducerProfile(undefined, {
        type: ORDER_FEED_WS_CONNECTING_PROFILE,
      })
    ).toEqual({ ...initialState, status: WebsocketStatus.CONNECTING });
  });

  it("should return state with WS status ONLINE", () => {
    expect(
      orderFeedReducerProfile(undefined, {
        type: ORDER_FEED_WS_OPEN_PROFILE,
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectingError: "",
    });
  });

  it("should return state with WS status OFFLINE", () => {
    expect(
      orderFeedReducerProfile(undefined, {
        type: ORDER_FEED_WS_CLOSE_PROFILE,
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should return state with data with information about orders profile", () => {
    const data = {
      orders: [
        {
          ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0948",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa0949",
          ],
          _id: "03",
          status: "done",
          number: 333333,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
        },
        {
          ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa094a",
            "643d69a5c3f7b9001cfa0948",
            "643d69a5c3f7b9001cfa0949",
          ],
          _id: "04",
          status: "done",
          number: 444444,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
        },
      ],
      total: 365,
      totalToday: 55,
    };

    expect(
      orderFeedReducerProfile(undefined, {
        type: ORDER_FEED_WS_MESSAGE_PROFILE,
        payload: data,
      })
    ).toEqual({
      ...initialState,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday,
    });
  });

  it("should return state with errorMessage", () => {
    const errorMessage = "Error";

    expect(
      orderFeedReducerProfile(undefined, {
        type: ORDER_FEED_WS_ERROR_PROFILE,
        payload: errorMessage,
      })
    ).toEqual({
      ...initialState,
      connectingError: errorMessage,
    });
  });
});
