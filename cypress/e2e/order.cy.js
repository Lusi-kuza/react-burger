describe("creating an order", () => {
  before(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("http://localhost:3000/");
    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login", {
      fixture: "user.json",
    }).as("loginUser");
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order.json",
    }).as("postOrder");
  });

  it("order should be created", () => {
    cy.get('[data-testid="Булки"]').first().as("bunDrag");
    cy.get('[data-testid="bunDropTarget"]').as("bunDropTarget");
    cy.get("@bunDrag").trigger("dragstart");
    cy.get("@bunDropTarget").trigger("drop");
    cy.get('[data-testid="Соусы"]').eq(2).as("fillingDrag");
    cy.get('[data-testid="fillingDropTarget"]').as("fillingDropTarget");
    cy.get("@fillingDrag").trigger("dragstart");
    cy.get("@fillingDropTarget").trigger("drop");
    cy.get("button").contains("Оформить заказ").click();

    cy.get('[data-testid="titleAuthForm"]').should("contain", "Вход");
    const email = "test@mail.ru";
    const password = "Ii123!";
    cy.get('[name="email"]').type(`${email}`);
    cy.get('[name="password"]').type(`${password}{enter}`);

    cy.get('[data-testid="titleBurgerIngredients"]').should(
      "contain",
      "Соберите бургер"
    );

    cy.get("button").contains("Оформить заказ").click();

    cy.get('[data-testid="orderNumber"]').should("contain", "123");
    cy.get('[data-testid="modalIcon"]').click();

    cy.get('[data-testid="fillingDropTarget"]').should(
      "contain",
      "Выберите начинку"
    );
    cy.get('[data-testid="bunDropTarget"]').should("contain", "Выберите булки");
  });
});
