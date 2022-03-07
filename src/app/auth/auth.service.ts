import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post("https://signup", { email, password }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post("https://loginurl", { email, password });
  }
}
