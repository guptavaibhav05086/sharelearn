import { Component, OnInit } from "@angular/core";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  ActivatedRoute
} from "@angular/router";
import { Subject } from "rxjs";
@Component({
  selector: "app-printers",
  templateUrl: "./printers.component.html",
  styleUrls: [
    "./printers.component.css",
    "../../assets/StudentDashboard/demo/demo.css",
    "../../assets/DashBoard/css/style.css",
    "../../assets/DashBoard/css/theme.css"
  ]
})
export class PrintersComponent implements OnInit {
  isPrinterVerified = false;
  //isDesignerVerified = false;
  displayOrders = false;
  data = {
    display: true,
    type: ""
  };
  resetFormSubject: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          debugger;
          let path = this.route.url;
          console.log(event);
          console.log("Navigation Start");

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          debugger;
          console.log(event);
          console.log("Navigation End");
          let path = this.route.url;
          if (
            event["url"] == "/printers/activeorders" ||
            event["url"] == "/printers/allorders"
          ) {
            //this.displayOrders == true;
            this.data.display = true;
            this.data.type = "order";
            this.resetFormSubject.next(this.data);
          } else if (
            event["url"] == "/printers/profile" ||
            event["url"] == "/printers/paymentdetails"
          ) {
            //this.displayOrders == true;
            this.data.display = true;
            this.data.type = "settings";
            this.resetFormSubject.next(this.data);
          } else {
            this.data.display = false;
            this.data.type = "other";
            //this.displayOrders = false;
            this.resetFormSubject.next(this.data);
          }
          break;
        }
        case event instanceof NavigationStart: {
          debugger;
          console.log(event);

          let path = this.route.url;
          break;
        }
      }
    });
  }
}
