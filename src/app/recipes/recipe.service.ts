import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  constructor() {}
  recipeSelected = new Subject<Recipe>();
  recipeDeleted = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      1,
      "Another Test Recipe",
      "This is simply a test",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F10%2F04%2F7115885.jpg",
      [new Ingredient("tomato", 10)]
    ),
    new Recipe(
      2,
      "A Test Recipe first",
      "This is simply a test",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F10%2F04%2F7115885.jpg",
      [new Ingredient("cheese", 10)]
    ),
  ];

  getRecipes() {
    return this.recipes;
  }
}
