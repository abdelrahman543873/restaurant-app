import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  constructor() {}
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "Another Test Recipe",
      "This is simply a test",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F10%2F04%2F7115885.jpg"
    ),
    new Recipe(
      "A Test Recipe first",
      "This is simply a test",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F10%2F04%2F7115885.jpg"
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
