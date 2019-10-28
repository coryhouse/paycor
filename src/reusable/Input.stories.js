import React from "react";
import Input from "./Input";
import { text } from "@storybook/addon-knobs";

// This labels our story
export default { title: "Input" };

function ExampleInput(props) {
  const [value, setValue] = React.useState("");

  return (
    <Input
      id="firstName"
      // Enable a knob for label with a default value of First Name
      label={text("label", "First Name")}
      name="firstName"
      onChange={event => setValue(event.target.value)}
      value={value}
      // Assign any props passed in down to this Input.
      {...props}
    />
  );
}

export const defaultExample = () => <ExampleInput />;

export const error = () => <ExampleInput error="First name is required." />;
