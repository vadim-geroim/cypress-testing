describe("Home page validation", () => {
    it('should verify the title of the main category', () => {
        cy.visit('/');
        cy.get('h1').contains('All products');
    });
});