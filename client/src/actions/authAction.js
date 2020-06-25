import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_CHANGED,
  CHANGE_FORM,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  USER_DETAILS,
  LOGOUT_USER,
} from "./types";
import Cookie from "js-cookie";
const axios = require("axios");

const fetcher = axios.create({
  baseURL: `http://localhost:3500`,
  withCredentials: true,
  credentials: "include",
});

fetcher.interceptors.request.use(
  async (config) => {
    const token = await Cookie.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//INPUT CHANGED EMAIL
export const emailChanged = ({ target: { value } }) => {
  return {
    type: EMAIL_CHANGED,
    payload: value,
  };
};

// INPUT CHANGED PASSWORD
export const passwordChanged = ({ target: { value } }) => {
  return { type: PASSWORD_CHANGED, payload: value };
};

// INPUT Confirm Password
export const confirmPasswordChange = ({ target: { value } }) => {
  return { type: CONFIRM_CHANGED, payload: value };
};

//CHANGED AUTHFORM
export const showAuthForm = (value) => {
  return {
    type: CHANGE_FORM,
    payload: value,
  };
};

// USER SIGNUP
// RETURN FROM SERVER - TOKEN
export const signupUser = ({ email, password, confirmPassword }) => async (
  dispatch
) => {
  dispatch({ type: LOGIN_USER });
  if (password === confirmPassword) {
    try {
      const result = await fetcher.post(`http://localhost:3500/users/signup`, {
        email,
        password,
      });
      const token = result.data.token;

      return dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: token,
      });
    } catch (error) {
      return dispatch({
        type: LOGIN_USER_FAIL,
        payload: "Invalid email, Already Sign Up.",
      });
    }
  } else {
    return dispatch({
      type: LOGIN_USER_FAIL,
      payload: "Incorrect Password.",
    });
  }
};

// USER LOGIN
// RETURN FROM SERVER - TOKEN
export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });
  try {
    const result = await fetcher.post(`http://localhost:3500/users/signin`, {
      email,
      password,
    });
    const token = result.data.token;

    return dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: token,
    });
  } catch (error) {
    return dispatch({
      type: LOGIN_USER_FAIL,
      payload: "Invalid password or email",
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const result = await fetcher.get(`http://localhost:3500/users`);
    const user = result.data.user;

    return dispatch({
      type: USER_DETAILS,
      payload: user,
    });
  } catch (err) {
    // ??
  }
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};
