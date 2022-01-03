import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  recipeForm: FormGroup;
  recipeId: number;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params.id;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(+this.recipeId - 1);
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

  onSubmit() {}

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
}
