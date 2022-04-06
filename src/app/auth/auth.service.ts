import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";
import { Login, Logout } from "./store/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private store: Store<AppState>
  ) {}

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  signup(email: string, password: string) {
    return this.http.post("https://signup", { email, password }).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((resData: User) => this.handleAuthentication(resData))
    );
  }

  login(email: string, password: string) {
    return this.http
      .post("https://loginurl", { email, password })
      .pipe(tap((resData: User) => this.handleAuthentication(resData)));
  }

  logout() {
    this.store.dispatch(new Logout());
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    this.store.select("auth").subscribe((stateData) => {
      if (!stateData.user) return;
      const loadedUser = new User(
        stateData.user.email,
        stateData.user.id,
        "randomToken",
        new Date()
      );
      if (loadedUser.token) this.user.next(loadedUser);
    });
  }

  private handleAuthentication(input: User) {
    this.store.dispatch(
      new Login({
        email: input.email,
        id: "randomId",
        _token: "randomString",
        _tokenExpirationDate: new Date(),
      })
    );
  }
}
