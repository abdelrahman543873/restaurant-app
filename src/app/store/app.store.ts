import {
  State,
  shoppingListReducer,
} from "../shopping-list/store/shopping-list.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { RecipeState, recipeReducer } from "../recipes/store/recipe.reducer";

export interface AppState {
  shoppingList: State;
  auth: AuthState;
  recipes: RecipeState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipeReducer,
};
