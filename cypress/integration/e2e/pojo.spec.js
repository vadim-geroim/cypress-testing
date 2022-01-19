
import LoginPage from '../../page-objects/pages/LoginPage';
import Navbar from '../../page-objects/components/Navbar';
import { url, login, psw } from '../../../config';

describe('Login functionality suite', () => {
    beforeEach(function () {
        cy.visit(url);
        Navbar.clickOnSignIn();
    });

    it('should fail on invalid credentials', () => {
        LoginPage.login('fake user name', 'fake password');
        LoginPage.displayErrorValidationMessage();
    });

    it('should pass on valid credentials', () => {
        LoginPage.login(login, psw);
        cy.contains('Cash Accounts');
    })
})