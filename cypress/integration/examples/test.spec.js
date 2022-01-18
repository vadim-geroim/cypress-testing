describe.skip("Home page validation", () => {
    it('should verify the title of the main category', () => {
        cy.visit('https://books.toscrape.com/index.html');
        cy.get('h1').contains('All products');
    });
});