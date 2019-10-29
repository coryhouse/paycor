import React from "react";
import PropTypes from "prop-types";
import { inputErrorStyle, errorStyle } from "../styles";

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        style={props.error ? inputErrorStyle : null}
        type={props.type}
        ref={ref}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      ></input>
      {props.error && (
        <p role="alert" style={errorStyle}>
          {props.error}
        </p>
      )}
    </div>
  );
});

Input.propTypes = {
  /** HTML ID assigned to the input */
  id: PropTypes.string.isRequired,

  /** Label value */
  label: PropTypes.string.isRequired,

  /** Input type */
  type: PropTypes.oneOf(["text", "email", "phone", "number"]),

  /** Input name */
  name: PropTypes.string.isRequired,

  /** Error to display below the component */
  error: PropTypes.string,

  /** Function called onChange */
  onChange: PropTypes.func.isRequired,

  /** Value assigned to the input */
  value: PropTypes.string.isRequired
};

export default Input;
