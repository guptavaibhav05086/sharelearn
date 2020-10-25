import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../../../app/services/helper.service";
@Component({
  selector: "app-section-brand",
  templateUrl: "./section-brand.component.html",
  styleUrls: ["./section-brand.component.css"]
})
export class SectionBrandComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}
  navigateTopath(path) {
    this.helper.navigateToPath(path);
  }
}
