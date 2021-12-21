import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  componentSelection = "";

  onSelection(selection: string) {
    this.componentSelection = selection;
  }
}
