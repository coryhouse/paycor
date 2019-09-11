import React from "react";
import { Link, Route } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import ManageUser from "./ManageUser";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <Route path="/" exact component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/manage-user" component={ManageUser} />
    </>
  );
}

export default App;
