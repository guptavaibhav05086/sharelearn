import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-leftnav",
  templateUrl: "./leftnav.component.html",
  styleUrls: ["./leftnav.component.css"]
})
export class LeftnavComponent implements OnInit {
  displayLeftNav = false;
  toggleSettings = false;
  toggleOrders = false;
  @Input() resetFormSubject: Subject<any> = new Subject<any>();
  constructor() {}
  toggleItemsSettings(e) {
    e.preventDefault();
    if (this.toggleSettings) {
      this.toggleSettings = false;
    } else {
      this.toggleSettings = true;
    }
  }
  toggleItemsOrders(e) {
    e.preventDefault();
    if (this.toggleOrders) {
      this.toggleOrders = false;
    } else {
      this.toggleOrders = true;
    }
  }
  ngOnInit() {
    debugger;
    this.resetFormSubject.subscribe(response => {
      debugger;
      if (response.type == "order") {
        this.toggleOrders = response.display;
        this.toggleSettings = false;
      } else if (response.type == "settings") {
        this.toggleSettings = response.display;
        this.toggleOrders = false;
      } else {
        this.toggleSettings = false;
        this.toggleOrders = false;
      }

      console.log(response);
    });
  }
}
