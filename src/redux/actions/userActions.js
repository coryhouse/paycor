import * as userApi from "../../api/userApi";
import { LOAD_USERS_SUCCESS } from "./actionTypes";

// Action creator
export function loadUsersSuccess(users) {
  // Passing users as the payload
  return { type: LOAD_USERS_SUCCESS, users: users };
}

// Async action creator using redux-thunk
export function loadUsers() {
  return function(dispatch) {
    return userApi.getUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    });
  };
}
