import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  user: userReducer,
});
