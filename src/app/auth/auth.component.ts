import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(input: NgForm) {
    if (!input.form.valid) return;
    this.isLoading = true;
    this.authService.signup(input.value.email, input.value.password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
    input.reset();
  }
}
