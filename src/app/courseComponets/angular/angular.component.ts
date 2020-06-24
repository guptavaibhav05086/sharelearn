import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../services/helper.service";
@Component({
  selector: "app-angular",
  templateUrl: "./angular.component.html",
  styleUrls: ["./angular.component.css"]
})
export class AngularComponent implements OnInit {
  constructor(private _helper: HelperService) {}
  courseId=2;
  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }
}
