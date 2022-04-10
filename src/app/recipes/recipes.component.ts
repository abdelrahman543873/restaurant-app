import { Component, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  selectedRecipe: Recipe;

  ngOnInit() {
    this.store.select("recipes").subscribe((stateData) => {
      this.selectedRecipe = stateData.selectedRecipe;
    });
  }
}
