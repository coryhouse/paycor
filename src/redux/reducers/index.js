import { combineReducers } from "redux";
import users from "./userReducer"; // Note my alias.

const rootReducer = combineReducers({
  users
});

export default rootReducer;
