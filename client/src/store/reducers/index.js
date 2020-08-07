// Give me ALL the reducers out there!
import { combineReducers } from "redux";

import isLoggedReducer from "./isLogged";
import tokenReducer from "./tokenReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  isLogged: isLoggedReducer,
  token: tokenReducer,
  cart: cartReducer,
});

export default rootReducer;
