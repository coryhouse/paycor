import {
  LOAD_USERS_SUCCESS,
  DELETE_USER_SUCCESS
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return action.users; // this will update the redux store
    case DELETE_USER_SUCCESS:
      return state.filter(u => u.id !== action.userId);
    default:
      return state;
  }
}
