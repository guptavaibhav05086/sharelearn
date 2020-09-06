import { Component, OnInit } from "@angular/core";
import { PrinterService } from "src/app/services/printer.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  constructor(private service: PrinterService) {}

  ngOnInit() {
    let email = localStorage.getItem("email");
    this.service.FetchDashboard(email).subscribe(
      data => {
        console.log(data);
        this.dashboardData = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
