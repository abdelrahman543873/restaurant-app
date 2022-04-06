import { Ingredient } from "../../shared/ingredient.model";
import { START_EDIT, STOP_EDIT } from "./shopping-list.actions";
import {
  ShoppingListActions,
  UPDATE_INGREDIENT,
} from "./shopping-list.actions";
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
} from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case UPDATE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = action.payload.newIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case DELETE_INGREDIENT:
      const filteredIngredients = [
        ...state.ingredients.filter((ingredient, index) => {
          if (index !== state.editedIngredientIndex) return ingredient;
        }),
      ];
      return {
        ...state,
        ingredients: filteredIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
