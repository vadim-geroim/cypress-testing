
//Notes: keep under 10 tests in a describe block to simplify the debugging process.
describe('Load URL, Assertions', () => {
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
describe('Implicit Waits, Pause and Debug', () => {

});