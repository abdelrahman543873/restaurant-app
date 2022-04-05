import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "../auth/auth.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: " ", redirectTo: "auth", pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  {
    path: "recipes",
    loadChildren: () =>
      import("../recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("../shopping-list/shopping.module").then((m) => m.ShoppingModule),
  },
  { path: "**", redirectTo: "auth" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
