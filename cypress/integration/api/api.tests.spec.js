/// <reference types="Cypress" />

describe('API scenarios', () => {
    it('should send GET request on pokemon/1', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/1').as('response');
        cy.get('@response')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json;');
    });

    it('should validate the status code 200', () => {
        cy.request('https://pokeapi.co/api/v2/type/3').as('response');
        cy.get('@response')
            .its('status')
            .should('equal', 200);
    });

    it('should validate the data in the body of the response', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/1').as('response');
        cy.get('@response')
            .its('body')
            .should('include', { name: "bulbasaur" });
    });

    it('should validate not found status code', () => {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/1000',
            failOnStatusCode: false
        }).as('response');

        cy.get('@response').its('status').should('equal', 404);
    });

    it('should validate simple GET request', () => {
        cy.request('https://api.chucknorris.io/jokes/random').as('response');
        cy.get('@response').its('status').should('equal', 200);
    });
});