import { Component, OnInit } from "@angular/core";
import { PrinterService } from "src/app/services/printer.service";
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  constructor(
    private service: PrinterService, 
    private helper: HelperService) {}

  ngOnInit() {
    let email = localStorage.getItem("email");
    this.service.FetchDashboard(email).subscribe(
      data => {
        console.log(data);
        this.dashboardData = data;
        let isUserVerifiedByAdmin = data["isVendorAdminVerified"];
        if (isUserVerifiedByAdmin == false) {
          this.helper.navigateToPath("/printers/profile");
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
