import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { SELECT_RECIPE, ADD_RECIPE } from "./recipe.actions";
import {
  RecipeActions,
  SET_RECIPES,
  DELETE_RECIPE,
  UPDATE_RECIPE,
} from "./recipe.actions";

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe;
}

const initialState: RecipeState = {
  selectedRecipe: null,
  recipes: [
    new Recipe(
      1,
      "Another Test Recipe",
      "This is simply a test",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F10%2F04%2F7115885.jpg",
      [new Ingredient("tomato", 10)]
    ),
    new Recipe(
      2,
      "A Test Recipe first",
      "This is simply a test",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F10%2F04%2F7115885.jpg",
      [new Ingredient("cheese", 10)]
    ),
  ],
};

export const recipeReducer = (state = initialState, action: RecipeActions) => {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: [...action.payload] };
    case ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case SELECT_RECIPE:
      return { ...state, selectedRecipe: action.payload };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipeEl) => {
          return recipeEl.id !== action.payload;
        }),
      };
    case UPDATE_RECIPE:
      const recipes = [...state.recipes];
      recipes[action.payload.id] = action.payload.newRecipe;
      return { ...state, recipes };
    default:
      return state;
  }
};
