import { AuthActions, LOGIN, LOGOUT } from "./auth.actions";

export interface AuthState {
  user: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: Date;
  };
  isAuthenticated: boolean;
}

export const initialState: AuthState = { user: null, isAuthenticated: false };

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions
) => {
  switch (action.type) {
    case LOGIN:
      return { ...initialState, user: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { ...initialState, user: null, isAuthenticated: false };
    default:
      return state;
  }
};
