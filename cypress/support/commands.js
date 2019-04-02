// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/*
https://github.com/cypress-io/cypress/issues/830#issuecomment-340031229

cy.get('app-shell').shadowDomElement(['page-app', 'page-cluster-reporting', 'page-cluster-reporting-select-plan', 'h2']).should('contain', 'Select Response Plan')
cy.get('app-shell').shadowDomElement(['page-app', 'page-cluster-reporting', 'page-cluster-reporting-select-plan', 'paper-button[id=confirm]']).click()
*/
Cypress.Commands.add("shadowDomElement", { prevSubject: true }, function(subject, selectors) {
  debugger;
  var currentElement = subject[0];
  for (var i = 0; i < selectors.length; i++) {
    currentElement = currentElement.shadowRoot;
    currentElement = currentElement.querySelector(selectors[i]);
    if (!currentElement) {
      break;
    }
  }

  // wrap this guy back into cypress so you can continue chaining off of it
  return cy.wrap(currentElement);
});
