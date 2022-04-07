import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "../store/app.store";
import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuthenticated = false;
    this.store.select("auth").subscribe((stateData) => {
      isAuthenticated = stateData.isAuthenticated;
    });
    return isAuthenticated;
  }
}
