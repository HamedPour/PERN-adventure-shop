// Give me ALL the reducers out there!
import { combineReducers } from "redux";

import isLoggedReducer from "./isLogged";
import tokenReducer from "./tokenReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  isLogged: isLoggedReducer,
  token: tokenReducer,
  cart: cartReducer,
  adventurer: userReducer,
});

export default rootReducer;
