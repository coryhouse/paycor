import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import ManageUser from "./ManageUser";
import { ToastContainer } from "react-toastify";
import * as userApi from "./api/userApi";
import Loading from "./reusable/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userApi.getUsers().then(users => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  function deleteUser(userId) {
    userApi.deleteUser(userId).then(() => {
      // Runs after the delete was successful
      const _users = users.filter(user => user.id !== userId);
      setUsers(_users);
    });
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <ToastContainer />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/users"
          render={reactRouterProps => (
            <Users
              users={users}
              deleteUser={deleteUser}
              {...reactRouterProps}
            />
          )}
        />
        <Route
          path="/manage-user/:userId?"
          render={props => (
            <ManageUser users={users} setUsers={setUsers} {...props} />
          )}
        />
      </Switch>
    </>
  );
}

export default App;
