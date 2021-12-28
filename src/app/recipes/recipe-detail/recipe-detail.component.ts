import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}
  recipe: Recipe;
  sub: Subscription;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params["id"] - 1);
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
