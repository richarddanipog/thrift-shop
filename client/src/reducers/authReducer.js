import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_CHANGED,
  CHANGE_FORM,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  token: "",
  loading: false,
  error: "",
  show: "login",
  guest: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FORM:
      return { ...initialState, show: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONFIRM_CHANGED:
      return { ...state, confirmPassword: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return { ...initialState, token: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
