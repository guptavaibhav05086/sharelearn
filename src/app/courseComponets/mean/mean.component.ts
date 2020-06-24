import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-mean",
  templateUrl: "./mean.component.html",
  styleUrls: ["./mean.component.css"]
})
export class MeanComponent implements OnInit {
  constructor(private _helper: HelperService) {}
  courseId=7;
  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }
}
