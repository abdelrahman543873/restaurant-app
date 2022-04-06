import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListActions } from "./shopping-list.actions";
import { ADD_INGREDIENT, ADD_INGREDIENTS } from "./shopping-list.actions";

const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};

export function shoppingListReducer(
  state = initialState,
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

    default:
      return state;
  }
}
