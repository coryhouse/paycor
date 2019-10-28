import React, { useState } from "react";
import Input from "./reusable/Input";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function isValid() {
    const _errors = {};
    if (!email) _errors.email = "Email required.";
    if (!password) _errors.password = "Password required.";
    setErrors(_errors);
    return Object.keys(_errors).length === 0; // is valid if errors object has no properties.
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid()) return;

    // In real app, would call API to check username and password entered.
    props.loginUser(2);
    debugger;
    props.history.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        id="email"
        name="email"
        value={email}
        error={errors.email}
        onChange={event => setEmail(event.target.value)}
      />

      <Input
        label="Password"
        id="password"
        name="password"
        value={password}
        error={errors.password}
        onChange={event => setPassword(event.target.value)}
      />

      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
