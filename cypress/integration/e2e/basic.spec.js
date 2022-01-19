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

describe('Login / logout flow', () => {
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

describe('Craete new payee', () => {
    //User login
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click();
        cy.fixture('user-data').then(user => {
            cy.get('#user_login').clear().type(user.name);
            cy.get('#user_password').clear().type(user.password);
            cy.get('input[value="Sign in"]').click();
        });
    });

    it('should create a new payee', () => {
        //Navigate to 'Add New Payee' tab
        cy.get('#pay_bills_tab a').click();
        cy.get('a[href="#ui-tabs-2"]').click();
        //Fill in a form and submit
        cy.get('#np_new_payee_name').clear().type('fake name');
        cy.get('#np_new_payee_address').clear().type('fake address');
        cy.get('#np_new_payee_account').clear().type('fake account');
        cy.get('#np_new_payee_details').clear().type('details');
        cy.get('#add_new_payee').click();
        //Validation
        cy.get('#alert_content').should('be.visible').and('contain', 'The new payee fake name was successfully created.');
    });
});

describe('Payment test', () => {
    //User login
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click();
        cy.fixture('user-data').then(user => {
            cy.get('#user_login').clear().type(user.name);
            cy.get('#user_password').clear().type(user.password);
            cy.get('input[value="Sign in"]').click();
        });
    });

    it('should send (fake) new payment', () => {
        cy.get('#pay_bills_tab a').click();
        cy.contains('Make payments to your saved payees');
        cy.get('#sp_payee').select('Wells Fargo');
        cy.get('#sp_account').select('Brokerage');
        cy.get('#sp_amount').clear().type(0);
        cy.get('#sp_date').type('1590-01-01 {enter}');
        cy.get('#sp_description').clear().type('description');
        cy.get('#pay_saved_payees').click();
        cy.get('#alert_content').should('be.visible').and('contain', 'The payment was successfully submitted.');
    });
});

describe('Currency Exchange', () => {
    //User login
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click();
        cy.fixture('user-data').then(user => {
            cy.get('#user_login').clear().type(user.name);
            cy.get('#user_password').clear().type(user.password);
            cy.get('input[value="Sign in"]').click();
        });
    });

    it('should display the currency exchange amount', () => {
        cy.get('#pay_bills_tab a').click();
        cy.get('a[href="#ui-tabs-3"]').click();
        cy.get('#pc_currency').select('China (yuan)');
        cy.get('#pc_amount').clear().type(100);
        cy.get('#pc_inDollars_true').click();
        cy.get('#pc_calculate_costs').click();
        cy.get('#pc_conversion_amount').should('contain', '575.71 yuan (CNY) = 100.00 U.S. dollar (USD)');
    });
});

describe('Transfer Funds', () => {
    //User login
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click();
        cy.fixture('user-data').then(user => {
            cy.get('#user_login').clear().type(user.name);
            cy.get('#user_password').clear().type(user.password);
            cy.get('input[value="Sign in"]').click();
        });
    });

    it('should verify entered data', () => {
        cy.get('#transfer_funds_tab a').click();
        //Fill in the form
        cy.get('#tf_fromAccountId').select('1');
        cy.get('#tf_toAccountId').select('2');
        cy.get('#tf_amount').clear().type(50);
        cy.get('#tf_description').clear().type('desc');
        cy.get('#btn_submit').click();
        //Validation
        cy.get('#tf_fromAccountId').should('have.value', 'Savings');
        cy.get('#tf_toAccountId').should('have.value', 'Checking');
        cy.get('#tf_amount').should('have.value', '50');
        cy.get('#tf_description').should('have.value', 'desc');
    })
});

describe('Filter Transactions', () => {
    //User login
    before(function () {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#signin_button').click();
        cy.fixture('user-data').then(user => {
            cy.get('#user_login').clear().type(user.name);
            cy.get('#user_password').clear().type(user.password);
            cy.get('input[value="Sign in"]').click();
        });
    });

    it('should validate filter result', () => {
        //Navigate to filter
        cy.get('#account_activity_tab').click();
        cy.get('a[href="#ui-tabs-2"]').click();
        //Fill in filter
        cy.get('#aa_fromAmount').clear().type(0);
        cy.get('#aa_toAmount').clear().type(100);
        cy.get('button').contains('Find').click();
        //Validation
        cy.get('#filtered_transactions_for_account').should('be.visible');
        cy.get('tbody > tr').its('length').should('be.gt', 0);
    });
});