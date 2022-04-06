import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../shopping-list/store/shopping-list.reducer";
import { DeleteIngredient } from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  recipeForm: FormGroup;
  recipeId: number;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params.id;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(this.recipeId);
    const formArray = [];
    for (let ingredient of recipe.ingredients) {
      formArray.push(
        new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })
      );
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: new FormArray(formArray),
    });
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeId,
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );
    this.recipeService.updateRecipe(this.recipeId - 1, recipe);
    this.router.navigate(["recipes"]);
  }

  onIngredientAdded() {
    (<FormArray>this.recipeForm.get("ingredients")).controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$]/),
        ]),
      })
    );
  }

  onDeleteIngredient(ingredient: any) {
    this.store.dispatch(new DeleteIngredient());
    (<FormArray>this.recipeForm.get("ingredients")).controls = (<FormArray>(
      this.recipeForm.get("ingredients")
    )).controls.filter((formGroup: FormGroup) => {
      return (
        formGroup.value.name !== ingredient.value.name &&
        formGroup.value.amount !== ingredient.value.amount
      );
    });
  }
}
