import { Component, OnInit } from "@angular/core";
import { DesignerService } from "../../services/designer.service";
import { HelperService } from "../../services/helper.service";
@Component({
  selector: "app-dashboad",
  templateUrl: "./dashboad.component.html",
  styleUrls: ["./dashboad.component.css"]
})
export class DashboadComponent implements OnInit {
  dashboardData: any;
  constructor(
    private service: DesignerService,
    private helper: HelperService
  ) {}

  ngOnInit() {
    let email = localStorage.getItem("email");
    this.service.FetchDesignerDashboard(email).subscribe(
      data => {
        console.log(data);
        this.dashboardData = data;
        let isUserVerifiedByAdmin = data["isDesignerAdminVerified"];
        if (isUserVerifiedByAdmin == false) {
          this.helper.navigateToPath("/designer/designerprofile");
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
