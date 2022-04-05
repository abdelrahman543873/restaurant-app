import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../shopping-list.service";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Store } from "@ngrx/store";
import { AddIngredient } from "../store/shopping-list.actions";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
  subscription: Subscription;
  @ViewChild("f") ngForm: NgForm;
  editMode: boolean = false;
  ingredientIndex: number;

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        const ingredient = this.shoppingListService.getIngredient(index);
        this.ngForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
        this.editMode = true;
        this.ingredientIndex = index;
      }
    );
  }

  onSubmit(formInput: NgForm) {
    const form = formInput.value;
    if (this.editMode)
      this.shoppingListService.updateIngredient(this.ingredientIndex, {
        name: form.name,
        amount: +form.amount,
      });
    else
      this.store.dispatch(
        new AddIngredient(new Ingredient(form.name, +form.amount))
      );
    this.ngForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.ngForm.reset();
    this.editMode = false;
  }

  onDelete(formInput: NgForm) {
    const form = formInput.value;
    this.shoppingListService.deleteIngredient({
      name: form.name,
      amount: +form.amount,
    });
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
