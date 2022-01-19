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

    static clickOnUserIcon() {
        cy.contains('username').click();
    }

    static clickOnLogoutBtn() {
        cy.get('#logout_link').click();
    }
}
