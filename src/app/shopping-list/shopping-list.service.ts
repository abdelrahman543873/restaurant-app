import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  constructor() {}
  onIngredientAdded = new Subject<Ingredient>();
  startedEditing = new Subject<number>();
  onIngredientDeleted = new Subject();
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  getIngredients() {
    return this.ingredients;
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter((ingredientEl) => {
      return (
        ingredientEl.name !== ingredient.name &&
        ingredientEl.amount !== ingredient.amount
      );
    });
    this.onIngredientDeleted.next();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
