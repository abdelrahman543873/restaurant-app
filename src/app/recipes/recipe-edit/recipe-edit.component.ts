import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import { DeleteIngredient } from "../../shopping-list/store/shopping-list.actions";
import { AppState } from "../../store/app.store";
import { UpdateRecipe, AddRecipe } from "../store/recipe.actions";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}
  recipeForm: FormGroup;
  recipeId: number;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) this.recipeId = +params.id;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  private initForm() {
    if (!this.recipeId)
      this.recipeForm = this.recipeForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        imagePath: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        ingredients: new FormArray([]),
      });
    else
      this.store.select("recipes").subscribe((stateData) => {
        const recipe = stateData.recipes[this.recipeId];
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
    this.store.dispatch(new AddRecipe(recipe));
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
