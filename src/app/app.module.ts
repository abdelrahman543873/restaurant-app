import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RoutingModule } from "./shared/routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingModule } from "./shopping-list/shopping.module";
import { SharedModule } from "./shared/shared.module";
@NgModule({
  declarations: [AppComponent, AuthComponent, HeaderComponent],
  imports: [
    RoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
