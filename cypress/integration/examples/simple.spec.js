
//Notes: keep under 10 tests in a describe block to simplify the debugging process.
describe.skip('Load URL, Assertions', () => {
    it('should wait to load the page only during 10 seconds', () => {
        cy.visit("https://example.com", { timeout: 10000 }); //It fails after 10 sec if page won't be loaded
    });

    it('should validate URL name', () => {
        cy.url().should('include', 'example.com');//Validates the URL name
    });

    it('the main title should be visible', () => {
        cy.get('h1').should('be.visible');//Validates the element is present
    });
});

//Cypress has automatic implicit wait by default
describe.skip('Implicit Waits, Pause and Debug', () => {
    it('should wait for 5 seconds', () => {
        cy.wait(5000);
    });

    it('should pause the test', () => {
        //cy.pause(); //Pauses the test execution
    });
});

//https://books.toscrape.com/
describe.skip('Interacting with Buttons', () => {
    it('should open the URL', () => {
        cy.visit('https://books.toscrape.com/', { timeout: 3000 });
        cy.url().should('include', 'https://books.toscrape.com/');
    });

    it('should click on Music category', () => {
        cy.get('a').contains('Music').click();
        cy.get('h1').contains('Music');
    });
});

describe.skip('Validating count of elements on the page', () => {
    it('should display the right number of books on Music category', () => {
        cy.visit('https://books.toscrape.com/', { timeout: 3000 });
        cy.get('a').contains('Music').click();
        cy.get('.product_pod').its('length').should('equal', 13);
    });
});

describe.skip('Logs example', () => {
    it('should validate Olio book price', () => {
        cy.visit('https://books.toscrape.com/');
        cy.get('a').contains('Poetry').click();
        cy.log('clicked on Poetry category');// Logs for debugging
        cy.get('a').contains('Olio').click();
        cy.get('.product_main .price_color').contains('£23.88');
    });
});

describe.skip('Browser refresh/reload', () => {
    it('should check the price remain the same after the browser refresh', () => {
        cy.visit('https://books.toscrape.com/');
        cy.get('a').contains('Travel').click();
        cy.reload();// the web browser reload
        cy.get('.alert-warning').contains('Warning!');
    })
});

describe.skip('Clear/Type text into inputs', () => {
    it('should validate failed on login', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.get('#user_login').clear().type('False login', { delay: 100 });//Use delay function for typing if needed 
        cy.get('#user_password').clear().type('False password');//Always clear input before typing
        cy.get('input[value="Sign in"').click();
        const alert = cy.get('.alert-error');
        alert.contains('Login and/or password are wrong.');
        alert.should('be.visible');
        //cy.get('.alert-error').contains('Login and/or password are wrong.');
        //cy.get('.alert-error').should('be.visible');
    });
});

describe('Interacting with a checkbox', () => {
    it('should click on checkbox', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.get('#user_remember_me').click();
        cy.get('#user_remember_me').should('be.checked');//Validation if checkbox has been checked
    })
});