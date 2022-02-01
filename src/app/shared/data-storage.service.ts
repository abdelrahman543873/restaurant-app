import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .post("urlOfOurBackend", { recipes })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.http.get("urlOfOurBackend").subscribe((data) => {});
  }
}
