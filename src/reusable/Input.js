import React from "react";
import PropTypes from "prop-types";
import { errorColor } from "../styles";

const inputErrorStyle = {
  border: "solid 1px " + errorColor
};

const errorStyle = {
  color: errorColor,
  fontWeight: "bold"
};

function Input(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        style={props.error ? inputErrorStyle : null}
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      ></input>
      {props.error && <p style={errorStyle}>{props.error}</p>}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "phone", "number"]),
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Input;
