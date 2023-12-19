import { mainUrl } from "./../../src/utils/burger-api";
import {
  bunCategory,
  bunDropTarget,
  fillingDropTarget,
  souseCategory,
  titleBurgerIngredients,
} from "./const";

describe("creating an order", () => {
  before(() => {
    cy.intercept("GET", `${mainUrl}/ingredients`, {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("");
    cy.intercept("POST", `${mainUrl}/auth/login`, {
      fixture: "user.json",
    }).as("loginUser");
    cy.intercept("POST", `${mainUrl}/orders`, {
      fixture: "order.json",
    }).as("postOrder");
  });

  it("order should be created", () => {
    cy.get(bunCategory).first().as("bunDrag");
    cy.get(bunDropTarget).as("bunDropTarget");
    cy.get("@bunDrag").trigger("dragstart");
    cy.get("@bunDropTarget").trigger("drop");
    cy.get(souseCategory).eq(2).as("fillingDrag");
    cy.get(fillingDropTarget).as("fillingDropTarget");
    cy.get("@fillingDrag").trigger("dragstart");
    cy.get("@fillingDropTarget").trigger("drop");
    cy.get("button").contains("Оформить заказ").click();

    cy.get('[data-testid="titleAuthForm"]').should("contain", "Вход");
    const email = "test@mail.ru";
    const password = "Ii123!";
    cy.get('[name="email"]').type(`${email}`);
    cy.get('[name="password"]').type(`${password}{enter}`);

    cy.get(titleBurgerIngredients).should("contain", "Соберите бургер");

    cy.get("button").contains("Оформить заказ").click();

    cy.get('[data-testid="orderNumber"]').should("contain", "123");
    cy.get('[data-testid="modalIcon"]').click();

    cy.get("@fillingDropTarget").should("contain", "Выберите начинку");
    cy.get("@bunDropTarget").should("contain", "Выберите булки");
  });
});
