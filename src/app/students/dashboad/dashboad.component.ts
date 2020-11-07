import { Component, OnInit } from "@angular/core";
import { DesignerService } from "../../services/designer.service";
import { HelperService } from "../../services/helper.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-dashboad",
  templateUrl: "./dashboad.component.html",
  styleUrls: ["./dashboad.component.css"]
})
export class DashboadComponent implements OnInit {
  dashboardData: any;
  constructor(
    private service: DesignerService,
    private helper: HelperService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    let email = localStorage.getItem("email");
    this.spinner.show();
    this.service.FetchDesignerDashboard(email).subscribe(
      data => {
        console.log(data);
        this.dashboardData = data;
        let isUserVerifiedByAdmin = data["isDesignerAdminVerified"];
        if (isUserVerifiedByAdmin == false) {
          this.helper.navigateToPath("/designer/designerprofile");
        }
        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }
}
