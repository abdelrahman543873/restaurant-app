import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post("https://signup", { email, password });
  }
}
