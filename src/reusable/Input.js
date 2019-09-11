import React from "react";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      ></input>
    </div>
  );
}

export default Input;
