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

    it("has duration Select set to 5", () => {
      cy.get('[data-js="select-duration"]').should("have.value", "5")
    });

    it("has Main Pie visible and full", () => {
      cy.get('[data-js="main-pie-path"]')
        .should('be.visible')
        .and('have.attr', 'd')
        .and('include', 'M 1 0 A 1 1 0 1 1 1 -2.4492935982947064e-16 L 0 0')
        ;
    });
    
    // Cypress does not support shadowDom
    // it("can set a Custom Duration", () => {
    //   cy.get('select')
    //     .select('Custom Duration')
    //     .get('#ok')
    // })
  });
});
