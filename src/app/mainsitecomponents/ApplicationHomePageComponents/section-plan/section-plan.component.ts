import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-section-plan",
  templateUrl: "./section-plan.component.html",
  styleUrls: ["./section-plan.component.css"]
})
export class SectionPlanComponent implements OnInit {
  videoUrl: any;
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getProducts().subscribe(
      data => {
        debugger;
        this.videoUrl = data["videoUrl"];
        console.log("Video Url: " + this.videoUrl);
      },
      err => {}
    );
  }
}
