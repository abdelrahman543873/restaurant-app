import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { RoutingModule } from "./shared/routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingModule } from "./shopping-list/shopping.module";
import { SharedModule } from "./shared/shared.module";
@NgModule({
  declarations: [AppComponent, AuthComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
