describe("The Home Page", function() {
  it("successfully loads", function() {
    cy.get('h1').should('contain', 'Pie Timer');
  });
});

context("Controls", () => {
  beforeEach(() => {
  });

  describe("Controls exist", () => {
    it("has Start and Reset buttons", () => {
      cy.get(".btn-start-pause").should("contain", "Start");
      cy.get(".btn-reset").should("contain", "Reset");
    });

    it("has a Select", () => {
      cy.get("#durationSelect").should("have.value", "5")
    });

  });
});
