import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-java",
  templateUrl: "./java.component.html",
  styleUrls: ["./java.component.css"]
})
export class JavaComponent implements OnInit {
  constructor(private _helper: HelperService) {}
  courseId=5;
  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }
}
