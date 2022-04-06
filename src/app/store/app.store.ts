import {
  State,
  shoppingListReducer,
} from "../shopping-list/store/shopping-list.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/store/auth.reducer";

export interface AppState {
  shoppingList: State;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
