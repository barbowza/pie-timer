describe("The Home Page", function() {
  it("successfully loads", function() {
    cy.visit("/docs/index.html"); // change URL to match your dev URL
  });
});

context("Controls", () => {
  beforeEach(() => {
    cy.viewport(411, 731);
    cy.visit("/docs/index.html");
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
