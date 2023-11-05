import {
  GET_PASSWORD_SUCCESS,
  SET_AUTH_CHECKED,
  SET_FORM_FAILED,
  SET_FORM_REQUEST,
  SET_USER_SUCCESS,
  TFormActions,
} from "./actions";

type TFormState = {
  isLoading: boolean;
  hasError: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  isAuthChecked: boolean;
  isPasswordReceived: boolean;
};

const initialState: TFormState = {
  isLoading: false,
  hasError: false,
  user: null,
  isAuthChecked: false,
  isPasswordReceived: false,
};

const formReducer = (state = initialState, action: TFormActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_FORM_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case SET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case GET_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordReceived: action.payload,
        isLoading: false,
      };
    case SET_FORM_FAILED:
      return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};

export { formReducer };
