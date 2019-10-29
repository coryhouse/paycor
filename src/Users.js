// Exercise: Convert this to a function component.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "./redux/actions/userActions";

function Users({ deleteUser }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users); // get users from Redux
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(userActions.loadUsers());
  }, [dispatch]);

  function renderUser(user) {
    return (
      <li key={user.id}>
        <button onClick={() => deleteUser(user.id)}>Delete</button>{" "}
        <Link id={"user-" + user.id} to={`/manage-user/${user.id}`}>
          {user.name}
        </Link>
      </li>
    );
  }

  // The JSX we returned here will be rendered.
  return (
    <>
      <h1>Users</h1>
      {redirect && <Redirect to="/manage-user" />}
      <button onClick={() => setRedirect(true)}>Add User</button>
      <ul>{users.map(renderUser)}</ul>
    </>
  );
}

Users.propTypes = {
  deleteUser: PropTypes.func.isRequired
};

// The state that we return here from the Redux store will be exposed
// to the React component above via props.
// function mapStateToProps(state) {
//   return {
//     users: state.users
//   };
// }

// The actions we return from this function will be passed as props
// to the component above.
// If we omit this function, then dispatch is provided on props to our component automatically.
// function mapDispatchToProps(dispatch) {
//   return {

//   }
// }

export default Users;
// export default connect(mapStateToProps)(Users);
