const { wait } = require("@testing-library/user-event/dist/utils");

describe("Test DnD", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("http://localhost:3000/");
  });

  it("should drag Crater Bun in burger constructor", () => {
    cy.get('[data-testid="Булки"]').first().as("bunDrag");
    cy.get('[data-testid="bunDropTarget"]').as("bunDropTarget");
    cy.get("@bunDrag").trigger("dragstart");
    cy.get("@bunDropTarget").trigger("drop");
    cy.get("@bunDropTarget").should("contain", "КKраторная булка");
    cy.get("@bunDrag").find('[class="counter__num"]').should("contain", "2");
  });

  it("should drag Fluorescent bun in burger constructor ", () => {
    cy.get('[data-testid="Булки"]').eq(1).as("bunDrag");
    cy.get('[data-testid="bunDropTarget"]').as("bunDropTarget");
    cy.get("@bunDrag").trigger("dragstart");
    cy.get("@bunDropTarget").trigger("drop");
    cy.get("@bunDropTarget").should("contain", "Флюоресцентная булка");
    cy.get("@bunDrag").find('[class="counter__num"]').should("contain", "2");
  });

  it("should drag two Traditional  sauce in burger constructor and delete one", () => {
    cy.get('[data-testid="Соусы"]').eq(2).as("fillingDrag");
    cy.get('[data-testid="fillingDropTarget"]').as("fillingDropTarget");
    cy.get("@fillingDrag").trigger("dragstart");
    cy.get("@fillingDropTarget").trigger("drop");
    cy.get("@fillingDropTarget")
      .first()
      .should("contain", "Соус традиционный галактический");
    cy.get("@fillingDrag")
      .find('[class="counter__num"]')
      .should("contain", "1");

    cy.get("@fillingDrag").trigger("dragstart");
    cy.get("@fillingDropTarget").trigger("drop");
    cy.get("@fillingDropTarget")
      .children()
      .eq(1)
      .should("contain", "Соус традиционный галактический");
    cy.get("@fillingDrag")
      .find('[class="counter__num"]')
      .should("contain", "2");

    cy.get("@fillingDropTarget")
      .children()
      .should(($li) => {
        expect($li).to.have.length(2);
      });

    cy.get("@fillingDropTarget")
      .children()
      .eq(1)
      .find('[class="constructor-element__action pr-2"]')
      .click();

    cy.get("@fillingDrag")
      .find('[class="counter__num"]')
      .should("contain", "1");

    cy.get("@fillingDropTarget")
      .children()
      .should(($li) => {
        expect($li).to.have.length(1);
      });
  });
});
