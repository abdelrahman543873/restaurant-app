import { User } from "../user.model";
import { AuthActions, LOGIN, LOGOUT } from "./auth.actions";

export interface AuthState {
  user: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: Date;
  };
}

export const initialState = { user: null };

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions
) => {
  switch (action.type) {
    case LOGIN:
      return { ...initialState, user: action.payload };
    case LOGOUT:
      return { ...initialState, user: null };
    default:
      return state;
  }
};
