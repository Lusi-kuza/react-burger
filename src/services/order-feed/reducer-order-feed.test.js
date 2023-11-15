import { WebsocketStatus } from "../../utils/types";
import {
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
} from "./actions";
import { initialState, orderFeedReducer } from "./reducer";

describe("REDUCER --- ORDER FEED", () => {
  it("should return the initial state", () => {
    expect(orderFeedReducer(undefined, {})).toEqual(initialState);
  });

  it("should return state with WS status CONNECTING", () => {
    expect(
      orderFeedReducer(undefined, {
        type: ORDER_FEED_WS_CONNECTING,
      })
    ).toEqual({ ...initialState, status: WebsocketStatus.CONNECTING });
  });

  it("should return state with WS status ONLINE", () => {
    expect(
      orderFeedReducer(undefined, {
        type: ORDER_FEED_WS_OPEN,
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectingError: "",
    });
  });

  it("should return state with WS status OFFLINE", () => {
    expect(
      orderFeedReducer(undefined, {
        type: ORDER_FEED_WS_CLOSE,
      })
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should return state with data with information about orders ", () => {
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
      orderFeedReducer(undefined, {
        type: ORDER_FEED_WS_MESSAGE,
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
      orderFeedReducer(undefined, {
        type: ORDER_FEED_WS_ERROR,
        payload: errorMessage,
      })
    ).toEqual({
      ...initialState,
      connectingError: errorMessage,
    });
  });
});
