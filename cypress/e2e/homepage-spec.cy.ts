describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.get('h1').should('have.text', 'Kitchen Sink');
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Visita la homepage exitosamente', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('.text-4xl').click();
    cy.get('.text-4xl').should('have.text', 'Welcome to PolicyPilot');
    /* ==== End Cypress Studio ==== */
  });
})