import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.store";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}
  recipes: Recipe[];

  ngOnInit() {
    this.store.select("recipes").subscribe((stateData) => {
      this.recipes = stateData.recipes;
    });
    this.recipeService.recipeDeleted.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}
