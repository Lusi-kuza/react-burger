import {
  GET_PASSWORD_SUCCESS,
  SET_AUTH_CHECKED,
  SET_FORM_FAILED,
  SET_FORM_REQUEST,
  SET_USER_SUCCESS,
} from "./actions";
import { formReducer, initialState } from "./reducer";

describe("REDUCER --- FORM", () => {
  it("should return the initial state", () => {
    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  it("should return state with field isLoading: true", () => {
    expect(
      formReducer(undefined, {
        type: SET_FORM_REQUEST,
      })
    ).toEqual({ ...initialState, isLoading: true, hasError: false });
  });

  it("should return state with auth checked (true)", () => {
    expect(
      formReducer(undefined, {
        type: SET_AUTH_CHECKED,
        payload: true,
      })
    ).toEqual({ ...initialState, isAuthChecked: true });
  });

  it("should return state with auth checked (false)", () => {
    expect(
      formReducer(undefined, {
        type: SET_AUTH_CHECKED,
        payload: false,
      })
    ).toEqual({ ...initialState, isAuthChecked: false });
  });

  it("should return state with information about user", () => {
    const data = {
      email: "test@test",
      name: "User",
    };
    expect(
      formReducer(undefined, {
        type: SET_USER_SUCCESS,
        payload: data,
      })
    ).toEqual({
      ...initialState,
      user: data,
      isLoading: false,
    });
  });

  it("should return state with information about received password (true)", () => {
    expect(
      formReducer(undefined, {
        type: GET_PASSWORD_SUCCESS,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      isPasswordReceived: true,
      isLoading: false,
    });
  });

  it("should return state with information about received password (false)", () => {
    expect(
      formReducer(undefined, {
        type: GET_PASSWORD_SUCCESS,
        payload: false,
      })
    ).toEqual({
      ...initialState,
      isPasswordReceived: false,
      isLoading: false,
    });
  });

  it("should return state with field hasError: true", () => {
    expect(
      formReducer(undefined, {
        type: SET_FORM_FAILED,
      })
    ).toEqual({ ...initialState, isLoading: false, hasError: true });
  });
});
