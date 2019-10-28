import React from "react";
import Select from "./Select";

export default { title: "Select" };

function ExampleSelect(props) {
  const [value, setValue] = React.useState("");

  return (
    <Select
      id="role"
      name="role"
      label="Role"
      value={value}
      onChange={event => setValue(event.target.value)}
      options={[{ label: "", value: "" }, { label: "Admin", value: "admin" }]}
      {...props}
    />
  );
}

export const defaultExample = () => <ExampleSelect />;
