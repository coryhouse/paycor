import React, { useState } from "react";
import Input from "./reusable/Input";

const newUser = {
  id: null,
  name: "",
  hairColor: ""
};

function ManageUser() {
  // Handle state via the useState Hook
  const [user, setUser] = useState(newUser);

  function saveUser(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const userCopy = { ...user };
    // using computed property syntax to set a property using a variable.
    userCopy[event.target.name] = event.target.value;
    setUser(userCopy);
  }

  return (
    <>
      <h1>Manage User</h1>
      <form onSubmit={saveUser}>
        <Input
          name="name"
          label="Name"
          type="text"
          id="user-name"
          onChange={handleChange}
          value={user.name}
        />

        <Input
          label="Hair color"
          type="text"
          name="hairColor" // this is the property we wanna set onChange
          id="hair-color"
          onChange={handleChange}
          value={user.hairColor}
        />

        <input type="submit" value="Save User" />
      </form>
    </>
  );
}

export default ManageUser;
