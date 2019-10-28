import React from "react";
import PropTypes from "prop-types";
import { inputErrorStyle, errorStyle } from "../styles";

function Select({ label, error, value, onChange, id, options }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <select
        style={error ? inputErrorStyle : null}
        id="role"
        value={value}
        name="role"
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" style={errorStyle}>
          {error}
        </p>
      )}
    </div>
  );
}

Select.propTypes = {
  /** HTML ID assigned to the input */
  id: PropTypes.string.isRequired,

  /** Label value */
  label: PropTypes.string.isRequired,

  /** Input name */
  name: PropTypes.string.isRequired,

  /** Error to display below the component */
  error: PropTypes.string,

  /** Function called onChange */
  onChange: PropTypes.func.isRequired,

  /** Value assigned to the input */
  value: PropTypes.string.isRequired,

  /** Array of options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Select;
