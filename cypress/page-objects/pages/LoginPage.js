import BasePage from "../BasePage";
export default class LoginPage extends BasePage {
    static login(email, psw) {
        cy.login(email, psw);
    }

    static clickOnForgotPswLink() {
        cy.get('a[href="/forgot-password.html"]').click();
    }

    static displayErrorValidationMessage() {
        cy.isVisible('.alert-error');
    }
}