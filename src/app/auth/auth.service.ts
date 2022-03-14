import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  user = new BehaviorSubject<User>(null);

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
  }

  private handleAuthentication(input: User) {
    const user = new User(input.email, "randomId", "randomString", new Date());
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
