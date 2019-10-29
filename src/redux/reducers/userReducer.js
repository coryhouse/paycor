import { LOAD_USERS_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return action.users; // this will update the redux store
    // add a case for handling DELETE_USER_SUCCESS
    default:
      return state;
  }
}
