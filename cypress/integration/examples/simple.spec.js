
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

describe('Validating count of elements on the page', () => {
    it('should display the right number of books on Music category', () => {
        cy.visit('https://books.toscrape.com/', { timeout: 3000 });
        cy.get('a').contains('Music').click();
        cy.get('.product_pod').its('length').should('equal', 13);
    });
});