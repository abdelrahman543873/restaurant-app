import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit() {}

  addIngredients(
    event: PointerEvent,
    amountInput: HTMLInputElement,
    nameInput: HTMLInputElement
  ) {
    this.ingredientAdded.emit({
      name: nameInput.value,
      amount: +amountInput.value,
    });
  }
}
