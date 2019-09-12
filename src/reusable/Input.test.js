import React from "react";
import Input from "./Input";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

it("should display error when passed", () => {
  // arrange
  const { getByRole } = render(
    <Input
      id="test"
      name="test"
      label="test"
      onChange={() => {}}
      value="test"
      error="example error"
    />
  );

  // act
  // assert
  const error = getByRole("alert");
  expect(error.innerHTML).toBe("example error");
});

it("should not render the example <p> when no error", () => {
  // arrange
  const tree = renderer
    .create(
      <Input
        id="test"
        name="test"
        label="test"
        onChange={() => {}}
        value="test"
      />
    )
    .toJSON();

  // assert
  expect(tree).toMatchSnapshot();
});
