import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";
import { Logout } from "../auth/store/auth.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubscription: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {}

  onLogout() {
    this.store.dispatch(new Logout());
    this.router.navigate(["auth"]);
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select("auth").subscribe((stateData) => {
      this.isAuthenticated = stateData.isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
