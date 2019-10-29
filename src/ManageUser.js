import React, { useState, useEffect, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import Input from "./reusable/Input";
import * as userApi from "./api/userApi";
import { toast } from "react-toastify";
import Select from "./reusable/Select";

const newUser = {
  id: null,
  name: "",
  role: ""
};

export function reducer(state, action) {
  switch (action.type) {
    case "loadUser":
      return { user: action.user, isLoading: false };
    case "changeUser":
      return { user: action.user };
    case "loadingComplete":
      return { isLoading: false };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function ManageUser(props) {
  const nameInputRef = useRef();
  const [state, dispatch] = useReducer(reducer, {
    user: newUser,
    isLoading: true
  });
  const { user, isLoading } = state;

  // Handle state via the useState Hook
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // focus the name input on load after loading completes
    if (!isLoading) nameInputRef.current.focus();
  }, [isLoading]);

  useEffect(() => {
    // IOW, if editing.
    let mounted = true;
    if (props.match.params.userId) {
      const _user = props.users.find(
        u => u.id === parseInt(props.match.params.userId, 10)
      );
      if (mounted) {
        dispatch({ type: "loadUser", user: _user });
      }
    } else {
      dispatch({ type: "loadingComplete" });
    }

    // Called when component is unmounting.
    return () => (mounted = false);
  }, [props.match.params.userId, props.users]);

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
    if (user.id) {
      userApi.editUser(user).then(savedUser => {
        const newUsers = props.users.map(u =>
          u.id === savedUser.id ? savedUser : u
        );
        props.setUsers(newUsers);
        handleSave(savedUser);
      });
    } else {
      userApi.addUser(user).then(savedUser => {
        const newUsers = [...props.users, savedUser];
        props.setUsers(newUsers);
        handleSave(savedUser);
      });
    }
  }

  function handleChange(event) {
    const userCopy = { ...user };
    // using computed property syntax to set a property using a variable.
    userCopy[event.target.name] = event.target.value;
    debugger;
    dispatch({ type: "changeUser", user: userCopy });
  }

  if (isLoading) return "Loading... 🦄";
  return (
    <>
      <h1>Manage User</h1>
      <form onSubmit={saveUser}>
        <Input
          name="name"
          label="Name"
          ref={nameInputRef}
          type="text"
          error={errors.name}
          id="user-name"
          onChange={handleChange}
          value={user.name}
        />

        <Select
          label="Role"
          id="role"
          value={user.role}
          name="role"
          onChange={handleChange}
          options={[
            { label: "", value: "" },
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" }
          ]}
          error={errors.role}
        />

        <input
          type="submit"
          disabled={isFormSubmitted}
          value={isFormSubmitted ? "Saving..." : "Save User"}
        />
      </form>
    </>
  );
}

ManageUser.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired
};

export default ManageUser;
