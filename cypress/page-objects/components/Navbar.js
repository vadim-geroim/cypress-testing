export default class Navbar {
    static clickOnLogo() {
        cy.get('.navbar .brand').click();
    }

    static clickOnSignIn() {
        cy.get('#signin_button').click();
    }

    static enterInSearch(keywords) {
        cy.get('#searchTerm').clear().type(`${keywords} {enter}`)
    }
}
