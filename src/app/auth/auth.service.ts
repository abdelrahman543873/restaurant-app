import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

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
    this.user.next(null);
    localStorage.clear();
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem("UserData"));
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.id,
      "randomToken",
      new Date()
    );
    if (loadedUser.token) this.user.next(loadedUser);
  }

  private handleAuthentication(input: User) {
    const user = new User(input.email, "randomId", "randomString", new Date());
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
