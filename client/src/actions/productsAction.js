import {
  GET_ALL_PRODUCTS,
  INPUT_CHANGED,
  INPUT_FILES,
  GET_PRODUCT_BY_ID,
  PRODUCT_ACTIONS,
  SUCCESS_UPDATE,
  ACTIVE_SPINNER,
  PRODUCTS_BY_USER,
  BUILD_QUERY,
  REMOVE_FROM_FILTER,
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

const getQuery = (query) => {
  let result = "";
  for (const q in query) {
    if (Array.isArray(query[q])) {
      result += `${q}=${query[q].join("+")}&`;
    } else {
      result += `${q}=${query[q]}&`;
    }
  }
  return result;
};

export const getProducts = (q) => async (dispatch) => {
  dispatch({ type: ACTIVE_SPINNER });
  try {
    const results = await fetcher.get(
      `http://localhost:3500/products?${getQuery(q)}`
    );

    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: results.data,
    });
  } catch (err) {
    throw new Error(`get Items failed with error: ${err}`);
  }
};

//ONCHANGE BUILD QUERY
export const addQuery = (query) => {
  return { type: BUILD_QUERY, payload: query };
};

//GET PRODUCTS USER BY ID
export const getProductsList = (byId) => async (dispatch) => {
  dispatch({ type: ACTIVE_SPINNER });
  try {
    const results = await fetcher.get(`http://localhost:3500/products/${byId}`);

    return dispatch({
      type: PRODUCTS_BY_USER,
      payload: results.data,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

// ON INPUT CHANGE
export const inputChanged = ({ name, value, errors }) => {
  return {
    type: INPUT_CHANGED,
    payload: { name, value, errors },
  };
};

// ON INPUT FILES
export const inputFiles = ({ files, errors }) => {
  return {
    type: INPUT_FILES,
    payload: { files, errors },
  };
};

//ADD PRODUCT TO DATA
export const addProduct = ({ data }) => async (dispatch) => {
  dispatch({ type: ACTIVE_SPINNER });
  try {
    await fetcher.post(`http://localhost:3500/products`, data);
    return dispatch({
      type: SUCCESS_UPDATE,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

//GET PRODUCT BY ID
export const getProductById = ({ byId }, edit = false) => async (dispatch) => {
  dispatch({ type: ACTIVE_SPINNER });
  try {
    const results = await fetcher.get(
      `http://localhost:3500/products/product/${byId}`
    );
    const singleProduct = results.data[0];
    return dispatch({
      type: edit ? PRODUCT_ACTIONS : GET_PRODUCT_BY_ID,
      payload: singleProduct,
    });
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

//UPDATE (PUT) PRODUCT BY ID
export const updateProductById = ({ byId, data }) => async (dispatch) => {
  dispatch({ type: ACTIVE_SPINNER });
  try {
    const results = await fetcher.put(
      `http://localhost:3500/products/product/${byId}`,
      data
    );
    const wasSuccess = results.data.product;
    if (wasSuccess) {
      return dispatch({
        type: SUCCESS_UPDATE,
      });
    }
  } catch (error) {
    throw new Error(`get Items failed with error: ${error}`);
  }
};

// REMOVE PROP FROM QUERY
export const delCurrentFilter = (prop) => {
  return { type: REMOVE_FROM_FILTER, payload: prop };
};
