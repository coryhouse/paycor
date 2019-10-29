import { reducer } from "./ManageUser";

it("should set isLoading and store user when loadUser is called", () => {
  // arrange
  const newUser = {
    id: null,
    name: "",
    role: ""
  };

  const initialState = {
    user: newUser,
    isLoading: true
  };

  const action = {
    type: "loadUser",
    user: {
      id: 1,
      name: "Cory",
      role: "user"
    }
  };

  // act
  const newState = reducer(initialState, action);

  // assert
  expect(newState.user.id).toEqual(1);
  expect(newState.isLoading).toEqual(false);
});
