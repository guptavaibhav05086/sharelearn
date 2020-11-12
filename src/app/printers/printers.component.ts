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
import { PrinterService } from "../services/printer.service";
import { HelperService } from "../services/helper.service";
import { NgxSpinnerService } from "ngx-spinner";
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
    private service: PrinterService,
    private helper: HelperService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.checkVendorApprovedByAdmin();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          //debugger;
          let path = this.route.url;
          console.log(event);
          console.log("Navigation Start");

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          //debugger;
          let isUserApproved = this.service.getPrinterApproveStatus();
          if (isUserApproved == false) {
            this.data.display = false;
            this.data.type = "leftNav";
            this.resetFormSubject.next(this.data);
          }
          // else{
          //   this.data.display = true;
          //   this.data.type = "leftNav";
          //   this.resetFormSubject.next(this.data);
          // }
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
            event["url"] == "/printers/paymentdetails" ||
            event["url"] == "/printers/changepassword"
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
          //debugger;
          console.log(event);

          let path = this.route.url;
          break;
        }
      }
    });
  }

  checkVendorApprovedByAdmin() {
    //this.spinnerService.show();
    let email = localStorage.getItem("email");
    this.service.FetchDashboard(email).subscribe(
      data => {
        console.log(data);
        //this.dashboardData = data;
        let isUserVerifiedByAdmin = data["isVendorAdminVerified"];
        this.service.setPrinterApproveStatus(data["isVendorAdminVerified"]);
        if (isUserVerifiedByAdmin == false) {
          if (isUserVerifiedByAdmin == false) {
            this.data.display = false;
            this.data.type = "leftNav";
            this.resetFormSubject.next(this.data);
          } else {
            this.data.display = true;
            this.data.type = "leftNav";
            this.resetFormSubject.next(this.data);
          }
          //this.spinnerService.hide();
          this.helper.navigateToPath("/printers/profile");
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
