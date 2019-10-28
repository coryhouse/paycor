import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import ManageUser from "./ManageUser";
import { ToastContainer } from "react-toastify";
import * as userApi from "./api/userApi";
import Loading from "./reusable/Loading";
import Login from "./Login";
import UserContext from "./UserContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

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

  function loginUser(userId) {
    setLoggedInUser(users.find(u => u.id === userId));
  }

  function logout() {
    setLoggedInUser(null);
  }

  if (isLoading) return <Loading />;

  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, logout: logout }}
    >
      <ToastContainer />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {loggedInUser ? (
          <p>Hi {loggedInUser.name}</p>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          render={props => <Login loginUser={loginUser} {...props} />}
        />
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
    </UserContext.Provider>
  );
}

export default App;
