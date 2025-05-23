import {expect} from "sucrase/dist/types/parser/traverser/util";

describe('template spec', () => {
  it('Recibo un quote valido', () => {
    // Dado que estoy en la pagina de quotes
    cy.visit('http://localhost:9002/get-quote')
    // y completo los datos validos
    cy.get('#ageInput').type('35');
    cy.get('#coverageNeedsText').type('Por si me roban el celu!');
    cy.get('#personalInformationText').type('Casasdo y con hijos!');
    // Cuando hago click en getRecommendations
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.space-y-6 > .inline-flex').click();
    /* ==== End Cypress Studio ==== */
    cy.get('#recommendationTitle').should('have.text', 'Recomendaciones de Pólizas');
    /* ==== End Cypress Studio ==== */
  })
})