describe('Searchbox', () => {
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
    });

    it('should verify the search result', () => {
        cy.get('#searchTerm').type('online banking {enter}');
        cy.get('h2').contains('Search Results:');
    });
});

describe('Send forgotten password', () => {
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

describe.only('Navbar links validation', () => {
    beforeEach(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
    });

    it('should load Onlin Banking page', () => {
        cy.get('#onlineBankingMenu').click();
        cy.title().should('eq', 'Zero - Free Access to Online Banking');
        cy.url().should('include', '/online-banking.html');
    });

    it('should load Feedback page', () => {
        cy.get('#feedback').click();
        cy.title().should('include', 'Zero - Contact Us');
        cy.url().should('include', 'feedback.html');
    });
});
