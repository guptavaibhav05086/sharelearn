import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-terms-conditions",
  templateUrl: "./terms-conditions.component.html",
  styleUrls: ["./terms-conditions.component.css"]
})
export class TermsConditionsComponent implements OnInit {
  @Input() type;
  displayPrinter = false;
  displayDesingner = true;
  constructor() {}

  ngOnInit(): void {
    if (this.type == "Printer") {
      this.displayPrinter = true;
    } else if (this.type == "designer") {
      this.displayDesingner = true;
    }
  }
}
