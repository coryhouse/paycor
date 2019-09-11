import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [{ id: 1, name: "Cory" }, { id: 2, name: "Leah" }]
    };

    // bind in ctor
    //  this.deleteUser = this.deleteUser.bind(this); // act sane.
  }

  // Class field with an arrow func
  deleteUser = userId => {
    const users = this.state.users.filter(user => user.id !== userId);
    this.setState({ users: users });
    debugger;
  };

  renderUser = user => {
    return (
      <li key={user.id}>
        <button onClick={() => this.deleteUser(user.id)}>Delete</button>{" "}
        {user.name}
      </li>
    );
  };

  // The JSX we returned here will be rendered.
  render() {
    return (
      <>
        <h1>Users</h1>
        <ul>{this.state.users.map(this.renderUser)}</ul>
      </>
    );
  }
}

export default Users;
