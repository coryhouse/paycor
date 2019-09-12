import { add } from "./math";

it("returns 3 when passed 1 and 2", () => {
  // arrange

  // act
  const result = add(1, 2);

  // assert
  expect(result).toBe(3);
});
