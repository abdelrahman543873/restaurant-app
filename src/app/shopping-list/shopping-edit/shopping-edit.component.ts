import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  addIngredients(
    event: MouseEvent,
    amountInput: HTMLInputElement,
    nameInput: HTMLInputElement
  ) {
    this.shoppingListService.onIngredientAdded.next({
      name: nameInput.value,
      amount: +amountInput.value,
    });
  }
}
