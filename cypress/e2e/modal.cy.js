import { mainUrl } from "../../src/utils/burger-api";
import { bunCategory, souseCategory, titleBurgerIngredients } from "./const";

describe("Checking the operation of the modal window", () => {
  beforeEach(() => {
    cy.intercept("GET", `${mainUrl}/ingredients`, {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("");
  });

  it("should open modal window category BUN", () => {
    cy.get(bunCategory).first().click();
    cy.get('[data-testid="modal"]').should("contain", "Детали ингредиента");
    cy.contains("КKраторная булка N-200i");
    cy.get('[data-testid="modalOverlay"]').click({ force: true });
    cy.get(titleBurgerIngredients).should("contain", "Соберите бургер");
  });

  it("should open modal window category  SOUSE ", () => {
    cy.get(souseCategory).first().click();
    cy.get('[data-testid="modal"]').should("contain", "Детали ингредиента");
    cy.contains("Соус Spicy-X");
    cy.get('[data-testid="modalIcon"]').click();
    cy.get(titleBurgerIngredients).should("contain", "Соберите бургер");
  });
});
