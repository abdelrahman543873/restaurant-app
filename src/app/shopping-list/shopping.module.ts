import { ShoppingRoutingModule } from "./shopping-routing.module";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [SharedModule, FormsModule, ShoppingRoutingModule],
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoppingModule {}
