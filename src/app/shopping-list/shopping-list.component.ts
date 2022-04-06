import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Observable } from "rxjs";
import { AppState, State } from "./store/shopping-list.reducer";
import { StartEdit } from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  ingredients: Observable<State>;

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
