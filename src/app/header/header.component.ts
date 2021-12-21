import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Output() selection = new EventEmitter<string>();

  onRecipeClick() {
    this.selection.emit("recipes");
  }

  onShoppingClick() {
    this.selection.emit("shopping");
  }
}
