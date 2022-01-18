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

describe.skip('Interacting with a checkbox', () => {
    it('should click on checkbox', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.get('#user_remember_me').click();
        cy.get('#user_remember_me').should('be.checked');//Validation if checkbox has been checked
    })
});

describe.skip('Variables and Aliases', () => {
    it('should use the simple aliase', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.get('input[value="Sign in"]').as('login-btn');//It creates alias which behaves like a selector name
        cy.get('@login-btn').click();
        cy.contains('Forgot your password ?').should('be.visible');
    });
});

describe.skip('Apply multiple assertions', () => {
    it('should check with multiple assertions', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.get('input[value="Sign in"]').click();
        cy.get('.alert-error').should('be.visible').and('contain', 'Login and/or password are wrong.');//Applies multiple assertions with(and) operator
    });
});

describe.skip('Clear cookies/local storage', () => {
    it('should clear cookies and local storage', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.clearCookies({ log: true });//Cleares cookies
        cy.clearLocalStorage('desired item', { log: true });//Cleares local storage
    });
});

describe.skip('Time and date modification', () => {
    it('should change the date', () => {
        const date = new Date(2000, 1, 20).getTime();
        cy.clock(date);
        cy.log(date);
    })
});

describe.skip('Viewport/Devices emulation', () => {
    it('should open the webpage on iphone', () => {
        cy.visit('https://example.com');
        cy.viewport('iphone-x');
        cy.wait(3000);
    });

    it('should open the webpage with specific sizes', () => {
        cy.visit('https://example.com');
        cy.viewport(550, 750);
        cy.wait(3000);
    });
});

describe.skip('Get and assert page title', () => {
    it('should assert page title', () => {
        cy.visit('https://example.com');
        cy.title().should('include', 'Example Domain');
    });
});

describe.skip('Fixtures/Static Data', () => {
    it('should use static user data', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.fixture('user-data').then(user => {
            const username = user.name;
            const password = user.password;
            cy.get('#user_login').clear().type(username, { delay: 100 });
            cy.get('#user_password').clear().type(password);
            cy.get('input[value="Sign in"').click();
            cy.get('.alert-error').should('be.visible');
        });
    })
});

describe.skip('Keyboard Press Simulation', () => {
    it('should press on Enter keyboard', () => {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#searchTerm').type('online banking {enter}', { delay: 100 });
        cy.get('h2').contains('Search Results:');
    });
});


describe.skip('working with Select box', () => {
    it('should select the value from the dropdown', () => {
        cy.visit('https://devexpress.github.io/testcafe/example/');
        cy.wait(2000);
        cy.get('#preferred-interface').select('JavaScript API');
        cy.get('#preferred-interface').should('have.value', 'JavaScript API');
    });
});

describe.skip('Taking screenshot', () => {
    it('should take a screenshot', () => {
        cy.visit("https://devexpress.github.io/testcafe/example/");
        cy.screenshot({ capture: 'fullPage' })
        cy.get('h1').screenshot();
    });
});

describe.skip('Scrolling on the Page', () => {
    it('should scroll the page up and down', () => {
        cy.visit('https://devexpress.github.io/testcafe/example/');
        cy.wait(2000);
        cy.get('#submit-button').scrollIntoView();
        cy.wait(1000);
        cy.get('header').scrollIntoView();
        cy.wait(1000);
    });
});

describe.skip('Write data into JSON or TXT file', () => {
    it('should write data into JSON file', () => {
        cy.writeFile('json-log.json', { name: 'Peter', age: 29, salary: '100K' });
    });

    it('should write data into txt file', () => {
        cy.writeFile('txt-log.txt', 'This is an example of the plain text.');
    });
});

describe.skip('Read data from JSON or TXT files', () => {
    it('should read the data from the JSON file', () => {
        cy.readFile('json-log.json').its('name').should('eq', 'Peter');
    });

    it('should read the data from the TXT file', () => {
        cy.readFile('txt-log.txt').should('eq', 'This is an example of the plain text.')
    });
});

describe.skip('Assert content type', () => {
    it('should verify document content type and property', () => {
        cy.visit('https://example.com/');
        cy.document().its('contentType').should('eq', 'text/html');
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
    });
});

class BasePage {
    static loadHomePage() {
        cy.visit('https://devexpress.github.io/testcafe/example/');
    }

    static wait(number) {
        cy.wait(number);
    }
}

class HomePage extends BasePage {
    static scrollUp() {
        cy.get('header').scrollIntoView();
    }

    static scrollDown() {
        cy.get('#submit-button').scrollIntoView();
    }
}

describe.skip('Abstraction with Classes', () => {
    it('should use abstract classes', () => {
        HomePage.loadHomePage();
        HomePage.wait(1000);
        HomePage.scrollDown();
        HomePage.wait(1000);
        HomePage.scrollUp();
        HomePage.wait(1000);
    });
});

describe.skip('Before, After, BeforeEach, AfterEach hooks', () => {
    before(function () {
        //This hook runs once before all test scenarios
        //Setup test data
        //Seed or reset the database
        cy.log('This is Before Hook runs once');
    });

    after(function () {
        //This hook runs once after all test scenarios
        //Test clean up
        //Clean cookies or local storage
        cy.log('This is After Hook runs once');
    });

    beforeEach(function () {
        //This hook runs before each test scenario
        cy.log('This is BeforeEach hook');
    });

    afterEach(function () {
        cy.log('This is AfterEach hook');
    });

    it('should run a simple test #1', () => {
        cy.log('TEST #1');
    });

    it('should run a simple test #2', () => {
        cy.log('TEST #2');
    });
});

describe.skip('JQuery with Cypress', () => {
    it('should user JQuery to find the element', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        const $loginBtn = Cypress.$('input[value="Sign in"]');
        cy.wrap($loginBtn).click();
    });
});

describe('Create and use custom Cypress command', () => {
    it('should use the custom Cypress command', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.login('fake login', 'fake password');
        cy.wait(1000);
        cy.get('.alert-error').should('be.visible');
    });
})