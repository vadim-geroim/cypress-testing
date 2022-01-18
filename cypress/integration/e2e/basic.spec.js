describe('Searchbox', () => {
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
    });

    it('should verify the search result', () => {
        cy.get('#searchTerm').type('online banking {enter}');
        cy.get('h2').contains('Search Results:');
    });
});

describe.only('Send forgotten password', () => {
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
    });

    it('should restore a valid password', () => {
        cy.get('#signin_button').click();
        cy.get('a').contains('Forgot your password ?').click();
        cy.get('#user_email').type('some email');
        cy.get('input[value="Send Password"]').click();
    });
});