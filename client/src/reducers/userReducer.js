import {
  USER_DETAILS,
  LOADING,
  LOGOUT_USER,
  ON_USER_CHANGE,
  USER_BY_PRODUCT,
} from "../actions/types";

const initialState = {
  user: null,
  inputProfile: null,
  ownerProduct: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case USER_DETAILS:
      return { ...state, user: action.payload, loading: false };
    case LOGOUT_USER:
      return { ...state, user: null };
    case ON_USER_CHANGE:
      return {
        ...state,
        inputProfile: { [action.payload.name]: action.payload.value },
      };
    case USER_BY_PRODUCT:
      return { ...state, ownerProduct: action.payload };
    default:
      return state;
  }
};
