import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    // this.shoppingListService.onIngredientDeleted.subscribe(() => {
    //   this.ingredients = this.shoppingListService.getIngredients();
    // });
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
