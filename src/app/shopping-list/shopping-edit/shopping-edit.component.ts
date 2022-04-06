import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Store } from "@ngrx/store";
import { DeleteIngredient, StopEdit } from "../store/shopping-list.actions";
import { AppState } from "../../store/app.store";
import {
  AddIngredient,
  UpdateIngredient,
} from "../store/shopping-list.actions";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}
  @ViewChild("f") ngForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;

  ngOnInit() {
    this.subscription = this.store
      .select("shoppingList")
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.ngForm.setValue({
            name: stateData.editedIngredient.name,
            amount: stateData.editedIngredient.amount,
          });
        } else this.editMode = false;
      });
  }

  onSubmit(formInput: NgForm) {
    const form = formInput.value;
    if (this.editMode)
      this.store.dispatch(
        new UpdateIngredient({
          newIngredient: { name: form.name, amount: +form.amount },
        })
      );
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
    this.store.dispatch(new StopEdit());
  }

  onDelete(formInput: NgForm) {
    const form = formInput.value;
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }
}
