import {
  getPasswordRequest,
  getUserInfoRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserInfoRequest,
} from "../../utils/burger-api";

export const SET_FORM_REQUEST = "SET_FORM_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const GET_PASSWORD_SUCCESS = "GET_PASSWORD_SUCCESS";
export const SET_FORM_FAILED = "SET_FORM_FAILED";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (form, request) => {
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

export const registerUser = (form) => {
  return setUser(form, registerRequest);
};

export const loginUser = (form) => {
  return setUser(form, loginRequest);
};

export const logoutUser = (request) => {
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

export const getPassword = (form) => {
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

export const resetPassword = (form) => {
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

export const getUserInfo = () => {
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

export const updateUserInfo = (form) => {
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

export const checkUserAuth = () => {
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
