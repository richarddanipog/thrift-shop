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
} from "../actions/types";
import { field } from "../validation/validator";

const initialState = {
  products: [],
  productsByUser: [],
  actionsProduct: {
    name: field({ name: "name", isRequired: true, minLength: 5 }),
    price: field({ name: "price", isRequired: true }),
    size: field({ name: "size", isRequired: true }),
    color: field({ name: "color", isRequired: true }),
    brand: field({ name: "brand", isRequired: true, minLength: 3 }),
    details: field({ name: "details", isRequired: true, minLength: 5 }),
    gender: field({ name: "gender", isRequired: true }),
    condition: field({ name: "condition", isRequired: true }),
    category: field({ name: "category", isRequired: true }),
    images: field({
      name: "images",
      isRequired: true,
      minLength: 1,
    }),
  },
  product: {},
  activeModal: false,
  query: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FROM_FILTER:
      const q = newQuery(action.payload, state.query);
      return { ...state, query: q };

    case BUILD_QUERY:
      return { ...state, query: { ...state.query, ...action.payload } };
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload, loading: false };
    case ACTIVE_SPINNER:
      return { ...state, loading: true };
    case PRODUCTS_BY_USER:
      return {
        ...state,
        productsByUser: action.payload,
        redirect: false,
        actionsProduct: { ...initialState.actionsProduct },
        loading: false,
      };
    case INPUT_CHANGED:
      return {
        ...state,
        actionsProduct: {
          ...state.actionsProduct,
          [action.payload.name]: {
            ...state.actionsProduct[action.payload.name],
            ...action.payload,
          },
        },
      };
    case INPUT_FILES:
      return {
        ...state,
        actionsProduct: {
          ...state.actionsProduct,
          images: {
            ...state.actionsProduct.images,
            value: [...action.payload.files],
            errors: action.payload.errors,
          },
        },
      };
    case PRODUCT_ACTIONS:
      const actionsProduct = setProduct(state.actionsProduct, action.payload);
      return { ...state, actionsProduct, loading: false };
    case GET_PRODUCT_BY_ID:
      return { ...state, product: action.payload, loading: false };
    case SUCCESS_UPDATE:
      return {
        ...state,
        loading: false,
        redirect: true,
        actionsProduct: { ...initialState.actionsProduct },
      };

    default:
      return state;
  }
};

const setProduct = (p, fecthProduct) => {
  // need to change the value of the product from EditProduct component
  const result = {};
  for (let prop in p) {
    result[prop] = {
      ...p[prop],
      value: fecthProduct[prop],
    };
  }
  return result;
};

const newQuery = (q, oldQuery) => {
  const newQuery = {};
  for (let p in oldQuery) {
    if (p !== q) {
      newQuery[p] = oldQuery[p];
    }
  }
  return newQuery;
};
