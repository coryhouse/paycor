// Exercise: Convert this to a function component.
import React, { useState, useEffect } from "react";
import * as userApi from "./api/userApi";
import { Link, Redirect } from "react-router-dom";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    userApi.getUsers().then(users => setUsers(users));
  }, []);

  function deleteUser(userId) {
    userApi.deleteUser(userId).then(() => {
      // Runs after the delete was successful
      const _users = users.filter(user => user.id !== userId);
      setUsers(_users);
    });
  }

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

export default Users;
