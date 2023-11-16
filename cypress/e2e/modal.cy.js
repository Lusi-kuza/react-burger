describe("Checking the operation of the modal window", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("http://localhost:3000/");
  });

  it("should open modal window category BUN", () => {
    cy.get('[data-testid="Булки"]').first().click();
    cy.get('[data-testid="modal"]').should("contain", "Детали ингредиента");
    cy.contains("КKраторная булка N-200i");
    cy.get('[data-testid="modalOverlay"]').click({ force: true });
    cy.get('[data-testid="titleBurgerIngredients"]').should(
      "contain",
      "Соберите бургер"
    );
  });

  it("should open modal window category  SOUSE ", () => {
    cy.get('[data-testid="Соусы"]').first().click();
    cy.get('[data-testid="modal"]').should("contain", "Детали ингредиента");
    cy.contains("Соус Spicy-X");
    cy.get('[data-testid="modalIcon"]').click();
    cy.get('[data-testid="titleBurgerIngredients"]').should(
      "contain",
      "Соберите бургер"
    );
  });
});
