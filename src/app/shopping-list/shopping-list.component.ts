import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "./store/shopping-list.reducer";
import { StartEdit } from "./store/shopping-list.actions";
import { AppState } from "../store/app.store";

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
