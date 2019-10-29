import { LOAD_USERS_SUCCESS } from "../actions/actionTypes";
import { users } from "./initialState";

export default function userReducer(state = users, action) {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return action.users; // this will update the redux store
    default:
      return state;
  }
}
