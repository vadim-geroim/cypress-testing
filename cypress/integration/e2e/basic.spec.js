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

describe('Navbar links validation', () => {
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

describe('Feedback Forms', () => {
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#feedback').click();
    });

    it('should submit the Feedback Form', () => {
        cy.get('#name').clear().type('Peter I');
        cy.get('#email').clear().type('Fake email');
        cy.get('#subject').clear().type('Test subject');
        cy.get('#comment').clear().type('Comments for testing.');
        cy.get('input[value="Send Message"]').click();
        cy.contains('Thank you for your comments, Peter I');
    });
});

describe.only('Login / logout flow', () => {
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click();
    });

    it('should attempt to login with invalid data', () => {
        cy.get('#user_login').clear().type('fake login');
        cy.get('#user_password').clear().type('fake psw');
        cy.get('input[value="Sign in"]').click();
        cy.get('.alert-error').should('be.visible').and('contain', 'Login and/or password are wrong.');
    });

    it('should login with valid data', () => {
        cy.fixture('user-data').then(user => {
            cy.get('#user_login').clear().type(user.name);
            cy.get('#user_password').clear().type(user.password);
            cy.get('input[value="Sign in"]').click();
            cy.contains('Account Summary');
        });
    });

    it('should successfully logout', () => {
        cy.get('.icon-user').click();
        cy.get('#logout_link').click();
        cy.url().should('contain', 'index.html');
    });
});