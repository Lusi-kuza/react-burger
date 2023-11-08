import {
  getPasswordRequest,
  getUserInfoRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserInfoRequest,
} from "../../utils/burger-api";
import { TForm, TRegister, TReset } from "../../utils/types";
import { AppThunk } from "../reducer";

export const SET_FORM_REQUEST: "SET_FORM_REQUEST" = "SET_FORM_REQUEST";
export const SET_USER_SUCCESS: "SET_USER_SUCCESS" = "SET_USER_SUCCESS";
export const GET_PASSWORD_SUCCESS: "GET_PASSWORD_SUCCESS" =
  "GET_PASSWORD_SUCCESS";
export const SET_FORM_FAILED: "SET_FORM_FAILED" = "SET_FORM_FAILED";
export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";

type TSetFormRequestAction = {
  type: typeof SET_FORM_REQUEST;
};

type TSetUserSuccessAction = {
  type: typeof SET_USER_SUCCESS;
  payload: {
    email: string;
    name: string;
  } | null;
};

type TGetPasswordSuccessAction = {
  type: typeof GET_PASSWORD_SUCCESS;
  payload: boolean;
};

type TSetFormFailedAction = {
  type: typeof SET_FORM_FAILED;
};

type TSetAuthCheckedAction = {
  type: typeof SET_AUTH_CHECKED;
  payload: boolean;
};

export type TFormActions =
  | TSetFormRequestAction
  | TSetUserSuccessAction
  | TGetPasswordSuccessAction
  | TSetFormFailedAction
  | TSetAuthCheckedAction;

export const setAuthChecked = (value: boolean): TSetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (
  form: TForm | Omit<TForm, "name">,
  request: (form: any) => Promise<TRegister>
): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: SET_FORM_REQUEST,
    });
    request(form)
      .then((data) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: data.user,
        });
        dispatch(setAuthChecked(true));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((e) => {
        dispatch({ type: SET_FORM_FAILED });
      });
  };
};

export const registerUser = (form: TForm): AppThunk => {
  return setUser(form, registerRequest);
};

export const loginUser = (form: Omit<TForm, "name">) => {
  return setUser(form, loginRequest);
};

export const logoutUser = (): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: SET_FORM_REQUEST,
    });
    logoutRequest()
      .then((data) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: null,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch((e) => {
        dispatch({ type: SET_FORM_FAILED });
      });
  };
};

export const getPassword = (form: Pick<TForm, "email">): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: SET_FORM_REQUEST,
    });
    getPasswordRequest(form)
      .then((data) => {
        dispatch({
          type: GET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch((e) => {
        dispatch({ type: SET_FORM_FAILED });
      });
  };
};

export const resetPassword = (form: TReset): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: SET_FORM_REQUEST,
    });
    resetPasswordRequest(form)
      .then((data) => {
        dispatch({
          type: GET_PASSWORD_SUCCESS,
          payload: false,
        });
      })
      .catch((e) => {
        dispatch({ type: SET_FORM_FAILED });
      });
  };
};

export const getUserInfo = (): AppThunk<Promise<unknown>> => {
  return function (dispatch) {
    dispatch({
      type: SET_FORM_REQUEST,
    });
    return getUserInfoRequest()
      .then((data) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: data.user,
        });
        dispatch(setAuthChecked(true));
      })
      .catch((e) => {
        dispatch({ type: SET_FORM_FAILED });
      });
  };
};

export const updateUserInfo = (form: TForm): AppThunk => {
  return function (dispatch) {
    dispatch({
      type: SET_FORM_REQUEST,
    });
    updateUserInfoRequest(form)
      .then((data) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: data.user,
        });
      })
      .catch((e) => {
        dispatch({ type: SET_FORM_FAILED });
      });
  };
};

export const checkUserAuth = (): AppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserInfo())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SET_USER_SUCCESS,
            payload: null,
          });
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};
