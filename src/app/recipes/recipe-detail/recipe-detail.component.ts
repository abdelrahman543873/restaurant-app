import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";
import { ActivatedRoute, Router } from "@angular/router";
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
    private route: ActivatedRoute,
    private router: Router
  ) {}
  recipe: Recipe;
  sub: Subscription;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params["id"]);
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(["recipes"]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
