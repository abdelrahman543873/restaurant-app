import { ShoppingRoutingModule } from "./shopping-routing.module";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [CommonModule, FormsModule, ShoppingRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoppingModule {}
