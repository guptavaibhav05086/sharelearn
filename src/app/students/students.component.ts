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
import { Cities } from "../Models/cities";
import { DesignerService } from "../services/designer.service";
import { HelperService } from "../services/helper.service";
import { NgxSpinnerService } from "ngx-spinner";
//import moduleName from "../../assets/DashBoard/css/theme.css";
@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: [
    "./students.component.css",

    "../../assets/StudentDashboard/demo/demo.css",
    "../../assets/DashBoard/css/style.css",
    "../../assets/DashBoard/css/theme.css"
  ]
})
export class StudentsComponent implements OnInit {
  isDesignerVerified = false;
  displayOrders = false;
  data = {
    display: true,
    type: ""
  };
  resetFormSubject: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private service: DesignerService,
    private helper: HelperService
  ) {}

  ngOnInit() {
    debugger;
    this.checkVendorApprovedByAdmin();
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
          //debugger;
          let isUserApproved = this.service.getDesignerApproveStatus();
          if (isUserApproved == false) {
            this.data.display = false;
            this.data.type = "leftNav";
            this.resetFormSubject.next(this.data);
          }
          //  else {
          //   this.data.display = true;
          //   this.data.type = "leftNav";
          //   this.resetFormSubject.next(this.data);
          // }
          console.log(event);
          console.log("Navigation End");
          let path = this.route.url;
          if (
            event["url"] == "/designer/activeorder" ||
            event["url"] == "/designer/allOrders"
          ) {
            //this.displayOrders == true;
            this.data.display = true;
            this.data.type = "order";
            this.resetFormSubject.next(this.data);
          } else if (
            event["url"] == "/designer/designerprofile" ||
            event["url"] == "/designer/paymentdetails"
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
    this.spinnerService.show();
    let email = localStorage.getItem("email");
    this.service.FetchDesignerDashboard(email).subscribe(
      data => {
        console.log(data);
        //this.dashboardData = data;
        let isUserVerifiedByAdmin = data["isDesignerAdminVerified"];
        this.service.setDesignerApproveStatus(data["isDesignerAdminVerified"]);
        if (isUserVerifiedByAdmin == false) {
          if (isUserVerifiedByAdmin == false) {
            this.data.display = false;
            this.data.type = "leftNav";
            this.resetFormSubject.next(this.data);
          }
          // else{
          //   this.data.display = true;
          //   this.data.type = "leftNav";
          //   this.resetFormSubject.next(this.data);
          // }
          this.spinnerService.hide();
          this.helper.navigateToPath("/designer/designerprofile");
        }
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
      }
    );
  }
}
