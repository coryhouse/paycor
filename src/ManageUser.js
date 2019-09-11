import React, { useState, useEffect } from "react";
import Input from "./reusable/Input";
import * as userApi from "./api/userApi";
import { toast } from "react-toastify";

const newUser = {
  id: null,
  name: "",
  hairColor: ""
};

function ManageUser(props) {
  // Handle state via the useState Hook
  const [user, setUser] = useState(newUser);

  useEffect(() => {
    // IOW, if editing.
    if (props.match.params.userId) {
      userApi.getUserById(props.match.params.userId).then(user => {
        setUser(user);
      });
    }
  }, [props.match.params.userId]);

  function handleSave(savedUser) {
    props.history.push("/users");
    toast.success(savedUser.name + " saved! 🎉");
  }

  function saveUser(event) {
    event.preventDefault();
    user.id
      ? userApi.editUser(user).then(handleSave)
      : userApi.addUser(user).then(handleSave);
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
