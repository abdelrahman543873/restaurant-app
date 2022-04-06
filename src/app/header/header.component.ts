import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";
import { Logout } from "../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: Boolean = false;
  private userSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private dataStorageService: DataStorageService
  ) {}

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select("auth").subscribe((stateData) => {
      this.isAuthenticated = !!stateData.user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
