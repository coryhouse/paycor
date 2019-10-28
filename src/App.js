import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import ManageUser from "./ManageUser";
import { ToastContainer } from "react-toastify";
import * as userApi from "./api/userApi";

function App() {
  const [users, setUsers] = React.useState([]);

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
        <Route path="/manage-user/:userId" component={ManageUser} />
        <Route path="/manage-user" component={ManageUser} />
      </Switch>
    </>
  );
}

export default App;
