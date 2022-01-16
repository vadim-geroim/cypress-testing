//const { describe } = require("mocha");

describe("Group 1", () => {
    it("Should validate true", () => {
        expect(true).to.equal(true);
    });

    it("Should fail the test", () => {
        expect(true).to.equal(false);
    })
});