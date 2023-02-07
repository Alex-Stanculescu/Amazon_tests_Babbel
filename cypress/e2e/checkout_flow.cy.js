// const { expect } = require("chai");


describe("Amazon e2e test", () => {
  it("Adds a tv to the shopping cart", () => {
    //access the amazon homepage
    cy.visit("https://www.amazon.de/");

    //reject cookies
    cy.contains("Weiter ohne zu akzeptieren").click();

    //simulate hovering over My account to display dropown menu
    cy.contains("Konto und Listen").trigger("mouseover");

    //Click on the Anmelden button
    cy.contains("Anmelden").click();

    //input the username
    cy.get("#ap_email").type("alx.stanculescu+babbeltests@gmail.com");

    //click submit
    cy.get("#continue").click();

    //input the password
    cy.get("#ap_password").type("TestingwithCypress");

    //click Login
    cy.get("#auth-signin-button").click();

    //assert that the profile name contains the name
    cy.get("#nav-link-accountList-nav-line-1").should((elem) => {
      expect(elem.text()).to.contain("Alexandru");
    });

    //input the value in the search field
    cy.get("#twotabsearchtextbox").click().type("samsung smart tv");

    //click the search button
    cy.get("#nav-search-submit-button").click();

    let result;
    //filter through the array of results
    //select the first result that contains "Samsung" in the title
    cy.get(".s-result-item")
      .filter(':contains("Samsung")')
      .first()
      .find(".s-line-clamp-2")
      .click()

    //click the "Add to cart" button
    cy.get("input[title='Add to Shopping Basket']").eq(0).click();

    //select the "No thanks" option when prompted to add warranty
    cy.get("#attachSiNoCoverage").should("be.visible").click();

    //click the "Proceed to checkout" button
    cy.get("#attach-sidesheet-checkout-button > span > input")
      .should("be.visible")
      .click();
  });
});
