beforeEach(() => {
  cy.visit("http://localhost:3000/users");
});

it("should support editing a user", () => {
  cy.get("#user-1").click();
  cy.findByLabelText("Name")
    .clear()
    .type("New name");
  cy.findByText("Save User").click();
  cy.findByText("New name");
});
