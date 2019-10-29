import * as userApi from "../../api/userApi";
import { LOAD_USERS_SUCCESS, DELETE_USER_SUCCESS } from "./actionTypes";

// Action creator
export function loadUsersSuccess(users) {
  // Passing users as the payload
  return { type: LOAD_USERS_SUCCESS, users: users };
}

export function deleteUserSuccess(userId) {
  return { type: DELETE_USER_SUCCESS, userId: userId };
}

// Async action creator using redux-thunk
export function loadUsers() {
  return function(dispatch) {
    return userApi.getUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    });
  };
}

// add async action for deleteUser
export function deleteUser(userId) {
  return function(dispatch) {
    return userApi.deleteUser(userId).then(() => {
      dispatch(deleteUserSuccess(userId));
    });
  };
}
