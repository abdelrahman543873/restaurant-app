import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService) {}

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
        console.log(resData);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.error = error.message;
      }
    );
    input.reset();
  }
}
