import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RoutingModule } from "./shared/routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";
@NgModule({
  declarations: [AppComponent, AuthComponent, HeaderComponent],
  imports: [
    RoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
