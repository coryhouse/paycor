import React, { useState, useEffect } from "react";
import Input from "./reusable/Input";
import * as userApi from "./api/userApi";
import { toast } from "react-toastify";
import { inputErrorStyle, errorStyle } from "./styles";

const newUser = {
  id: null,
  name: "",
  role: ""
};

function ManageUser(props) {
  // Handle state via the useState Hook
  const [user, setUser] = useState(newUser);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // IOW, if editing.
    let mounted = true;
    if (props.match.params.userId) {
      userApi.getUserById(props.match.params.userId).then(user => {
        if (mounted) {
          setUser(user);
          setIsLoading(false);
        }
      });
    } else {
      // If adding, nothing to load
      setIsLoading(false);
    }

    // Called when component is unmounting.
    return () => (mounted = false);
  }, [props.match.params.userId]);

  function handleSave(savedUser) {
    props.history.push("/users");
    toast.success(savedUser.name + " saved! 🎉");
  }

  function isValid() {
    // using underscore prefix to avoid naming conflict with state
    const _errors = {};
    if (!user.name) _errors.name = "Name is required.";
    if (!user.role) _errors.role = "Role is required.";
    setErrors(_errors);
    // If errors object still has no properties, then there are no errors.
    return Object.keys(_errors).length === 0;
  }

  function saveUser(event) {
    event.preventDefault(); // Don't post back.
    if (!isValid()) return;
    setIsFormSubmitted(true);
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

  if (isLoading) return "Loading... 🦄";
  return (
    <>
      <h1>Manage User</h1>
      <form onSubmit={saveUser}>
        <Input
          name="name"
          label="Name"
          type="text"
          error={errors.name}
          id="user-name"
          onChange={handleChange}
          value={user.name}
        />

        <div>
          <label htmlFor="role">Role</label>
          <br />
          <select
            style={errors.role ? inputErrorStyle : null}
            id="role"
            value={user.role}
            name="role"
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p role="alert" style={errorStyle}>
              {errors.role}
            </p>
          )}
        </div>

        <input
          type="submit"
          disabled={isFormSubmitted}
          value={isFormSubmitted ? "Saving..." : "Save User"}
        />
      </form>
    </>
  );
}

export default ManageUser;
