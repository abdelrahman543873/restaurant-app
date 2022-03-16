import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeDetailComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RecipesRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecipesModule {}
