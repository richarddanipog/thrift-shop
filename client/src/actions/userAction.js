import {
  USER_DETAILS,
  LOADING,
  ON_USER_CHANGE,
  USER_BY_PRODUCT,
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

//USER SAVE AVATAR IMG OR CHANGE IMG
export const saveAvatarImg = (userId, data) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const results = await fetcher.put(
      `http://localhost:3500/users/image/${userId}`,
      data
    );
    return dispatch({ type: USER_DETAILS, payload: results.data.user });
  } catch (err) {}
};

//ON CHANGE USER PROFILE
export const onInputUpdate = ({ target: { name, value } }) => {
  return {
    type: ON_USER_CHANGE,
    payload: { name, value },
  };
};

//SAVE USER CHANGE PROFILE
export const onSaveProfile = (data, userId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const results = await fetcher.put(
      `http://localhost:3500/users/${userId}`,
      data
    );
    return dispatch({
      type: USER_DETAILS,
      payload: results.data.user,
    });
  } catch (error) {}
};

//GET USER BY PRODUCT ID
export const getOwnerProduct = (userId) => async (dispatch) => {
  try {
    const result = await fetcher.get(
      `http://localhost:3500/users/product/${userId}`
    );
    return dispatch({
      type: USER_BY_PRODUCT,
      payload: result.data.user,
    });
  } catch (err) {}
};
