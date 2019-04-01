describe('The Home Page', function() {
    it('successfully loads', function() {
      cy.visit('/docs/index.html'); // change URL to match your dev URL
    })
  })

context('Controls', () => {
    beforeEach(() => {
        cy.viewport(411, 731);
        cy.visit('/docs/index.html')
    })
  
    describe('Start Pause', () => {
      it('Start should start the timer', () => {
          cy.get()
      })
  
      it('.and() - chain multiple assertions together', () => {
      })
    })
  
  })
  