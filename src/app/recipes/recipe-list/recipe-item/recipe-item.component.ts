import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.store";
import { SelectRecipe } from "../../store/recipe.actions";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  @Input() recipe: Recipe;

  ngOnInit() {}

  onRecipeItemSelect() {
    this.store.dispatch(new SelectRecipe(this.recipe));
  }
}
