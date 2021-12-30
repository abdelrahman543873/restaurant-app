import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {}
  subscription: Subscription;
  @ViewChild("f") ngForm: NgForm;
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        const ingredient = this.shoppingListService.getIngredient(index);
        this.ngForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
    );
  }

  addIngredients(formInput: NgForm) {
    const form = formInput.value;
    this.shoppingListService.onIngredientAdded.next({
      name: form.name,
      amount: +form.amount,
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
