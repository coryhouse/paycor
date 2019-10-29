export default function userReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_USERS_SUCCESS":
      return action.users; // this will update the redux store
    default:
      return state;
  }
}
