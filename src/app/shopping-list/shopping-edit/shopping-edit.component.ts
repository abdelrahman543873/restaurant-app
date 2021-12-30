import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  addIngredients(formInput: NgForm) {
    const form = formInput.value;
    this.shoppingListService.onIngredientAdded.next({
      name: form.name,
      amount: +form.amount,
    });
  }
}
