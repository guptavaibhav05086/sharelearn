import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { WindowRefService } from "src/app/services/window-ref.service";
import { HelperService } from "src/app/services/helper.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-section-top",
  templateUrl: "./section-top.component.html",
  styleUrls: ["./section-top.component.css"]
})
export class SectionTopComponent implements OnInit {
  imgUrl = "../../../../assets/HomePageImg/Sec1.jpg";

  constructor() {}

  ngOnInit(): void {}
}
