import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AddIngredients } from "../../shopping-list/store/shopping-list.actions";
import { AppState } from "../../store/app.store";
import { DeleteRecipe } from "../store/recipe.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}
  recipe: Recipe;
  sub: Subscription;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.store.select("recipes").subscribe((stateData) => {
        this.recipe = stateData.recipes.filter((recipeEl) => {
          return recipeEl.id === +params["id"];
        })[0];
      });
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  deleteRecipe(id: number) {
    this.store.dispatch(new DeleteRecipe(id));
    this.router.navigate(["recipes"]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
