import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(input: NgForm) {
    this.isLoading = true;
    if (!input.form.valid) return;
    let authObs: Observable<Record<any, any>>;
    if (this.isLoginMode)
      authObs = this.authService.login(input.value.email, input.value.password);
    else
      authObs = this.authService.signup(
        input.value.email,
        input.value.password
      );
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (error) => {
        this.isLoading = false;
        this.error = error.message;
        this.authService.user.next(
          new User(input.value.email, "randomId", "randomToken", new Date())
        );
      }
    );
    input.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
