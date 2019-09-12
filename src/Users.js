import React from "react";
import * as userApi from "./api/userApi";
import { Link, Redirect } from "react-router-dom";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      redirect: false
    };

    // bind in ctor
    //  this.deleteUser = this.deleteUser.bind(this); // act sane.
  }

  // Magical lifecycle method that's called after component is mounted on the page.
  // (there are lots of others). Only valid for class components. Function components use Hooks.
  componentDidMount() {
    userApi.getUsers().then(users => this.setState({ users: users }));
  }

  // Class field with an arrow func
  deleteUser = userId => {
    userApi.deleteUser(userId).then(() => {
      // Runs after the delete was successful
      const users = this.state.users.filter(user => user.id !== userId);
      this.setState({ users: users });
    });
  };

  renderUser = user => {
    return (
      <li key={user.id}>
        <button onClick={() => this.deleteUser(user.id)}>Delete</button>{" "}
        <Link id={"user-" + user.id} to={`/manage-user/${user.id}`}>
          {user.name}
        </Link>
      </li>
    );
  };

  // The JSX we returned here will be rendered.
  render() {
    return (
      <>
        <h1>Users</h1>
        {this.state.redirect && <Redirect to="/manage-user" />}
        <button onClick={() => this.setState({ redirect: true })}>
          Add User
        </button>
        <ul>{this.state.users.map(this.renderUser)}</ul>
      </>
    );
  }
}

export default Users;
