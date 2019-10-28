// Exercise: Convert this to a function component.
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

function Users({ deleteUser, users }) {
  const [redirect, setRedirect] = useState(false);

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
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default Users;
